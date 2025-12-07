import { getAll, findExpenseById, createExpense } from "../services/expenseService.js";

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
        await expense.remove();
        res.status(200).json({
            success: true,
            message: "Expense Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}