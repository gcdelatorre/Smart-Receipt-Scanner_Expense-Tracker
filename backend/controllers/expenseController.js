import { createExpense } from "../services/createExpense.js";
import { getAllExpense } from "../services/getAllExpense.js";

export const addExpense = async (req, res) => {
    try {
        const newExpense = await createExpense({ ...req.body, userId: req.user.id });
        res.status(200).json({
            success: true,
            data: newExpense,
            message: "Expense Created Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAll = async (req, res) => {
    const expenses = getAllExpense()

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