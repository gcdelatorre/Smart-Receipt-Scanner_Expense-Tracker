import { getAll, findExpenseById, createExpense } from "../services/expenseService.js";
import User from "../models/user.model.js";

export const addExpense = async (req, res) => {

    try {

        // commented out code for updating user's overall budget when adding expense
        // const expenseAmount = Number(req.body.amount);
        // const user = await User.findById("693aec9c08d1f6edd4c2ad5f"); // hardcoded userId for now
        // if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        // // subtract from user's overallBudget
        // user.overallBudget -= expenseAmount;
        // await user.save();

        const expenseAmount = Number(req.body.amount);
        const category = req.body.category;
        const user = await User.findById("693aec9c08d1f6edd4c2ad5f");
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });

        // find the category budget
        const categoryBudget = user.categoryBudgets.find(cat => cat.category === category);

        // check if category budget exists
        if (!categoryBudget) {
            return res.status(400).json({
                success: false,
                message: `No budget found for category: ${category}`
            });
        }

        // validation for checking if expense exceeds category budget
        if (categoryBudget.usedAmount + expenseAmount > categoryBudget.amount) {
            return res.status(400).json({
                success: false,
                message: `Expense exceeds budget for category: ${category}`
            });
        }

        // update the usedAmount for the category budget
        // updateOne works like
        // “Find the first user whose _id matches userId and has a category budget named category.
        // Then, increase ($inc means increase) the usedAmount of that matched category by expenseAmount.
        // If no user or category matches, do nothing.”
        await User.updateOne(
            { _id: "693aec9c08d1f6edd4c2ad5f", "categoryBudgets.category": category },
            { $inc: { "categoryBudgets.$.usedAmount": expenseAmount } }
        );


        const newExpense = await createExpense({ ...req.body, userId: "64c1f0f9a4f12b3a5e123456" });
        res.status(200).json({
            success: true,
            data: newExpense,
            message: "Expense Created Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getSingleExpenseById = async (req, res) => {
    const expense = await findExpenseById(req.params.id);

    if (!expense) {
        return res.status(404).json({ success: false, message: "Expense Not Found" });
    }

    try {
        res.status(200).json({
            success: true,
            data: expense,
            message: "Expense Retrieved Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllExpense = async (req, res) => {
    const expenses = await getAll({})

    try {
        res.status(200).json({
            success: true,
            data: expenses,
            message: "Expense Gathered Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

export const updateExpenseById = async (req, res) => {
    const expense = await findExpenseById(req.params.id);

    if (!expense) {
        return res.status(404).json({ success: false, message: "Expense Not Found" });
    }

    try {
        Object.assign(expense, req.body);
        const updatedExpense = await expense.save();
        res.status(200).json({
            success: true,
            data: updatedExpense,
            message: "Expense Updated Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const deleteExpenseById = async (req, res) => {
    const expense = await findExpenseById(req.params.id);
    if (!expense) {
        return res.status(404).json({ success: false, message: "Expense Not Found" });
    }
    try {
        await expense.deleteOne();
        res.status(200).json({
            success: true,
            message: "Expense Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}