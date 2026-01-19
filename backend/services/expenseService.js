import Expense from '../models/expense.model.js'
import User from '../models/user.model.js'

// create a new expense
export const createExpense = async (expenseData) => {
    const { store, amount, category, items, description, transactionType, date, userId, imageUrl } = expenseData;

    const newExpense = await Expense.create({
        store, amount, category, items, description, transactionType, date, userId, imageUrl
    });

    return newExpense;

}

// get all expenses for a user
export const getAll = async (userId) => {
    const expenses = await Expense.find({ userId })

    return expenses;
}


// find expense by id
export const findExpenseById = async (expenseId, userId) => {
    const expense = await Expense.findOne({ _id: expenseId, userId });
    return expense;
}

export const deductCategoryBudget = async (userId, category, amount) => {
    await User.updateOne(
        {
            _id: userId,
            "categoryBudgets.category": category
        },
        {
            $inc: {
                "categoryBudgets.$.usedAmount": -amount
            }
        }
    )
}

export const deleteExpenseAndUpdateBudget = async (expenseId, userId) => {
    const expense = await Expense.findOne({ _id: expenseId, userId })

    if (!expense) {
        throw { status: 404, message: "Expense not found" };
    }

    await expense.deleteOne();

    await deductCategoryBudget(expense.userId, expense.category, expense.amount);
}

export const updateExpense = async (expenseId, updateData, userId) => {
    const originalExpense = await Expense.findOne({ _id: expenseId, userId });

    if (!originalExpense) {
        throw { status: 404, message: "Expense not found" };
    }

    const originalAmount = originalExpense.amount;
    const originalCategory = originalExpense.category;

    const newAmount = updateData.amount === undefined ? originalAmount : updateData.amount;
    const newCategory = updateData.category === undefined ? originalCategory : updateData.category;


    // Only adjust budgets if category or amount changes
    if (originalCategory !== newCategory || originalAmount !== newAmount) {
        // Revert the used amount for the original category
        if (originalAmount > 0) {
            await User.updateOne(
                { _id: userId, "categoryBudgets.category": originalCategory },
                { $inc: { "categoryBudgets.$.usedAmount": -originalAmount } }
            );
        }

        // Apply the used amount for the new category
        const user = await User.findById(userId);
        const categoryBudget = user.categoryBudgets.find(b => b.category === newCategory);

        if (categoryBudget) {
            // Check for budget overflow
            if (categoryBudget.usedAmount + newAmount > categoryBudget.amount) {
                // Rollback the reverted amount
                if (originalAmount > 0) {
                    await User.updateOne(
                        { _id: userId, "categoryBudgets.category": originalCategory },
                        { $inc: { "categoryBudgets.$.usedAmount": originalAmount } }
                    );
                }
                throw { status: 400, message: `Update exceeds budget for category: ${newCategory}` };
            }

            await User.updateOne(
                { _id: userId, "categoryBudgets.category": newCategory },
                { $inc: { "categoryBudgets.$.usedAmount": newAmount } }
            );
        }
    }


    // Update and save the expense
    Object.assign(originalExpense, updateData);
    const updatedExpense = await originalExpense.save();

    return updatedExpense;
};