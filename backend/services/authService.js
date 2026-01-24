import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

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
