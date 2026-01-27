import User from "../models/user.model.js";

export const getProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateProfile = async (userId, updateData) => {

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const newUsername = updateData.username;
    const sameUsername = user.username === newUsername;
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser && !sameUsername) {
        throw new Error('Username already exists');
    }

    const newEmail = updateData.email;
    const sameEmail = user.email === newEmail;
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail && !sameEmail) {
        throw new Error('Email already exists');
    }

    user.username = newUsername;
    user.email = newEmail;
    await user.save();

    return user;
};