import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Expense from '../models/expense.model.js';
import Income from '../models/income.model.js';

// Generate Access Token (Short lived)
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
};

// Generate Refresh Token (Long lived)
const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};

// Register a new user
export const registerUser = async (userData) => {
    const { name, username, email, password, overallBudget, categoryBudgets } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw {
            status: 400,
            message: 'User with this email or username already exists'
        };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        overallBudget: overallBudget || 0,
        categoryBudgets: categoryBudgets || []
    });

    // Generate token
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    // Return user without password
    const userObj = newUser.toObject();
    delete userObj.password;

    return {
        user: userObj,
        accessToken,
        refreshToken
    };
};

// Login user
export const loginUser = async (emailOrUsername, password) => {
    // Find user by email or username
    const user = await User.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
        throw {
            status: 401,
            message: 'Invalid credentials'
        };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw {
            status: 401,
            message: 'Invalid credentials'
        };
    }

    // Generate token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Return user without password
    const userObj = user.toObject();
    delete userObj.password;

    return {
        user: userObj,
        accessToken,
        refreshToken
    };
};

// Get current user
export const getCurrentUser = async (userId) => {
    const user = await User.findById(userId).select('-password');

    if (!user) {
        throw {
            status: 404,
            message: 'User not found'
        };
    }

    return user;
};

export const changeUserPassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw {
                status: 400,
                message: 'Incorrect old password'
            };
        }

        if (newPassword.length < 6) {
            throw {
                status: 400,
                message: 'New password must be at least 6 characters long'
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        return {
            success: true,
            message: 'Password changed successfully'
        };
    } catch (error) {
        throw error;
    }
}

export const deleteUserAccount = async (userId) => {
    try {
        // 1. Delete all related data first (Cascade Delete)
        await Expense.deleteMany({ userId });
        await Income.deleteMany({ userId });

        // 2. Delete the user record
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            throw {
                status: 404,
                message: 'User not found'
            };
        }

        return {
            success: true,
            message: 'Account and all related data deleted successfully'
        };
    } catch (error) {
        throw error;
    }
}