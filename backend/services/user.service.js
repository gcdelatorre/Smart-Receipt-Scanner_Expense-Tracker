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