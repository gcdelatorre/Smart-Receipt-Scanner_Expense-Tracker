import User from '../models/user.model.js'

// create a new user
export const createUser = async (userData) => {
    const { name, username, email, password, overallBudget, categoryBudgets } = userData;

    const newUser = await User.create({
        name, username, email, password, overallBudget, categoryBudgets
    });

    return newUser;
}

// find user by id
export const findUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
}


export const getAllUsers = async () => {
    const users = await User.find({});

    return users
}


export const updateBudgets = async (userId, budgets) => {
    const { overallBudget, categoryBudgets } = budgets;

    const user = await User.findById(userId);
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    // Use the new overall budget if provided, otherwise keep the existing one
    const newOverallBudget = Number(overallBudget ?? user.overallBudget);

    // Validate and sanitize category budgets if provided
    if (categoryBudgets && Array.isArray(categoryBudgets)) {
        const validCategoryBudgets = categoryBudgets.filter(
            (budget) => budget.category && Number(budget.amount) >= 0
        );

        const newCategoryTotal = validCategoryBudgets.reduce((acc, cat) => acc + Number(cat.amount), 0);

        if (newCategoryTotal > newOverallBudget) {
            throw {
                status: 400,
                message: `Category budgets total (${newCategoryTotal}) cannot exceed overall budget of ${newOverallBudget}.`
            };
        }

        // Preserve usedAmount for existing categories while updating
        user.categoryBudgets = validCategoryBudgets.map(newBudget => {
            const existingBudget = user.categoryBudgets.find(b => b.category === newBudget.category);
            return {
                ...newBudget,
                amount: Number(newBudget.amount),
                usedAmount: existingBudget?.usedAmount || 0
            };
        });
    }

    user.overallBudget = newOverallBudget;

    const updatedUser = await user.save();
    return updatedUser;
}

export const updateUserSettingsPreferences = async (userId, settingsPreferences) => {
    const { currency, dateFormat, numberFormat, privacyMode } = settingsPreferences;

    const user = await User.findById(userId);
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    user.settingsPreferences = {
        currency: currency ?? user.settingsPreferences.currency,
        dateFormat: dateFormat ?? user.settingsPreferences.dateFormat,
        numberFormat: numberFormat ?? user.settingsPreferences.numberFormat,
        privacyMode: privacyMode ?? user.settingsPreferences.privacyMode
    };

    const updatedUser = await user.save();
    return updatedUser;
}

export const checkAndResetBudgets = async (user) => {
    // If no lastBudgetReset date, set it to now (initialization case) and save
    if (!user.lastBudgetReset) {
        user.lastBudgetReset = new Date();
        await user.save();
        return false;
    }

    const lastReset = new Date(user.lastBudgetReset);
    const now = new Date();

    // Check if the current month/year is different from the last reset month/year
    const isNewMonth = now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear();

    if (isNewMonth) {
        // Reset all category budgets usedAmount to 0
        if (user.categoryBudgets && user.categoryBudgets.length > 0) {
            user.categoryBudgets = user.categoryBudgets.map(budget => ({
                ...budget,
                usedAmount: 0
            }));
        }

        user.lastBudgetReset = now;
        await user.save();
        return true; // Indicates a reset happened
    }

    return false; // No reset needed
}