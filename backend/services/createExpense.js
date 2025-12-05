import Expense from '../models/expense.model.js'

export const createExpense = async (expenseData) => {
    const { store, amount, category, items, date, userId, imageUrl } = expenseData;

    const newExpense = await Expense.create({
        store, amount, category, items, date, userId, imageUrl
    });

    return newExpense;

}