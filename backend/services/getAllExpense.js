import Expense from '../models/expense.model.js'

export const getAllExpense = async () => {
    const expenses = await Expense.find({})

    return expenses;
}