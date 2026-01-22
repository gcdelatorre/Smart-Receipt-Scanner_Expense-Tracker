import User from "../models/user.model.js";

export const getProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

export const updateProfile = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};