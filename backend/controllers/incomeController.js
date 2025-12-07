import { getAll, findIncomeById, createIncome } from '../services/incomeService.js'

// create a new income
export const addIncome = async (req, res) => {
    try {
        const newIncome = await createIncome({ ...req.body, userId: "64c1f0f9a4f12b3a5e123456" }); // hardcoded userId for now  
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
    const income = await findIncomeById(req.params.id);
    if (!income) {
        return res.status(404).json({ success: false, message: "Income Not Found" });
    }
    try {
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
    const incomes = await getAll({})
    try {
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
    const income = await findIncomeById(req.params.id);
    if (!income) {
        return res.status(404).json({ success: false, message: "Income Not Found" });
    }
    try {
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

