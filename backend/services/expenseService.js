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

// get all expenses
export const getAll = async () => {
    const expenses = await Expense.find({})

    return expenses;
}


// find expense by id
export const findExpenseById = async (expenseId) => {
    const expense = await Expense.findById(expenseId);
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

export const deleteExpenseAndUpdateBudget = async (expenseId) => {
    const expense = await Expense.findById(expenseId)

    if (!expense) {
        throw { status: 404, message: "Expense not found" };
    }

    await expense.deleteOne();

    await deductCategoryBudget(expense.userId, expense.category, expense.amount);
}    
