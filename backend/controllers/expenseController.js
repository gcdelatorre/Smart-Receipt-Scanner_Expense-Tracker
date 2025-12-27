import { getAll, findExpenseById, createExpense, deleteExpenseAndUpdateBudget } from "../services/expenseService.js";
import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";

export const getSpendingAnalytics = async (req, res) => {
    const { period } = req.query;

    let startDate;
    const endDate = new Date();

    if (period === 'This Week') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'This Month') {
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    } else if (period === 'Last Month') {
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate.setDate(0);
    } else if (period === 'This Year') {
        startDate = new Date(endDate.getFullYear(), 0, 1);
    } else {
        return res.status(400).json({ success: false, message: 'Invalid period' });
    }

    try {
        const expenses = await Expense.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    day: '$_id',
                    value: '$total',
                    _id: 0
                }
            }
        ]);

        res.status(200).json({ success: true, data: expenses });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

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
            const newExpense = await createExpense({ ...req.body, userId: "693aec9c08d1f6edd4c2ad5f" });
            res.status(200).json({
                success: true,
                data: newExpense,
                message: "Expense Created Successfully"
            });
        }

        if (categoryBudget) {
            // validation for checking if expense exceeds category budget
            if (categoryBudget.usedAmount + expenseAmount > categoryBudget.amount) {
                return res.status(400).json({
                    success: false,
                    message: `Expense exceeds budget for category: ${category}`
                });
            }

            // update the usedAmount for the category budget
            await User.updateOne(
                { _id: "693aec9c08d1f6edd4c2ad5f", "categoryBudgets.category": category },
                { $inc: { "categoryBudgets.$.usedAmount": expenseAmount } }
            );

            const newExpense = await createExpense({ ...req.body, userId: "693aec9c08d1f6edd4c2ad5f" });
            return res.status(200).json({
                success: true,
                data: newExpense,
                message: "Expense Created and Budget Updated Successfully"
            });
        }

        // This part will only be reached if there's no category budget
        const newExpense = await createExpense({ ...req.body, userId: "693aec9c08d1f6edd4c2ad5f" });
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
    try {
        await deleteExpenseAndUpdateBudget(req.params.id);

        res.status(200).json({
            success: true,
            message: "Expense Deleted and Budget Updated Successfully"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}