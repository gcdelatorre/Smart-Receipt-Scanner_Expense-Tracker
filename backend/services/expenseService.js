import Expense from '../models/expense.model.js'

// create a new expense
export const createExpense = async (expenseData) => {
    const { store, amount, category, items, date, userId, imageUrl } = expenseData;

    const newExpense = await Expense.create({
        store, amount, category, items, date, userId, imageUrl
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