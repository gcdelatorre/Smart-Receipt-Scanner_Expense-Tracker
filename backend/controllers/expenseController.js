import Expense from "../models/expense.model.js"

export const addExpense = async (req, res) => {
    const { store, amount, category, items, date, userId, imageUrl } = req.body;
    try {
        const newExpense = await Expense.create({
            store, amount, category, items, date, userId, imageUrl
        });
        res.status(200).json({
            success: true,
            data: newExpense,
            message: "Expense Created Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllExpense = async (req, res) => {
    const expenses = await Expense.find({})

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