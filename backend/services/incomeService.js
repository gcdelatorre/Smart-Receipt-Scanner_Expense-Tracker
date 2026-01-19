import Income from '../models/income.model.js'

// create a new expense
export const createIncome = async (incomeData) => {
    const { amount, category, description, transactionType, date, userId } = incomeData;

    const newIncome = await Income.create({
        amount, category, description, transactionType, date, userId
    });

    return newIncome;
}

// get all incomes for a user
export const getAll = async (userId) => {
    const incomes = await Income.find({ userId })

    return incomes;
}

// find income by id
export const findIncomeById = async (incomeId, userId) => {
    const income = await Income.findOne({ _id: incomeId, userId });
    return income;
}