import { createExpense } from "../services/createExpense.js";
import { getAllExpense } from "../services/getAllExpense.js";

export const addExpense = async (req, res) => {
    try {
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

export const getAll = async (req, res) => {
    const expenses = await getAllExpense({})

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