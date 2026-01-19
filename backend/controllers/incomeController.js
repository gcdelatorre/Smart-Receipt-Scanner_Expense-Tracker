import { getAll, findIncomeById, createIncome } from '../services/incomeService.js'

// create a new income
export const addIncome = async (req, res) => {
    try {
        const newIncome = await createIncome({ ...req.body, userId: req.user._id });
        res.status(200).json({
            success: true,
            data: newIncome,
            message: "Income Created Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// get single income by id
export const getSingleIncomeById = async (req, res) => {
    try {
        const income = await findIncomeById(req.params.id, req.user._id);
        if (!income) {
            return res.status(404).json({ success: false, message: "Income Not Found" });
        }
        res.status(200).json({
            success: true,
            data: income,
            message: "Income Retrieved Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
// get all income
export const getAllIncome = async (req, res) => {
    try {
        const incomes = await getAll(req.user._id);
        res.status(200).json({
            success: true,
            data: incomes,
            message: "Income Gathered Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

// update income by id
export const updateIncomeById = async (req, res) => {
    try {
        const income = await findIncomeById(req.params.id, req.user._id);
        if (!income) {
            return res.status(404).json({ success: false, message: "Income Not Found" });
        }
        Object.assign(income, req.body);
        const updatedIncome = await income.save();
        res.status(200).json({
            success: true,
            data: updatedIncome,
            message: "Income Updated Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

//delete income by id
export const deleteIncomeById = async (req, res) => {
    try {
        const income = await findIncomeById(req.params.id, req.user._id);
        if (!income) {
            return res.status(404).json({ success: false, message: "Income Not Found" });
        }
        await income.deleteOne();
        res.status(200).json({
            success: true,
            message: "Income Deleted Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
