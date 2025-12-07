import Income from '../models/expense.model.js'

// create a new expense
export const createIncome = async (incomeData) => {
    const { amount, category, description, date, userId } = incomeData;

    const newIncome = await Income.create({
        amount, category, description, date, userId
    });

    return newIncome;
}

// get all expenses
export const getAll = async () => {
    const incomes = await Income.find({})

    return incomes;
}

// find income by id
export const findIncomeById = async (incomeId) => {
    const income = await Income.findById(incomeId);
    return income;
}