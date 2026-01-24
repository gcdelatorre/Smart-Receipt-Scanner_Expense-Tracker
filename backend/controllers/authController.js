import { registerUser, loginUser, getCurrentUser } from '../services/authService.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    try {
        const { name, username, email, password, overallBudget, categoryBudgets } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username, email, and password'
            });
        }

        const result = await registerUser({
            name,
            username,
            email,
            password,
            overallBudget,
            categoryBudgets
        });

        // Set Access Token (15 mins)
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            data: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            message: 'User registered successfully'
        });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Server error during registration'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Validation
        if (!emailOrUsername || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email/username and password'
            });
        }

        const result = await loginUser(emailOrUsername, password);

        // Set Access Token (15 mins)
        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            success: true,
            data: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            message: 'Login successful'
        });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Server error during login'
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await getCurrentUser(req.user._id);

        res.status(200).json({
            success: true,
            data: user,
            message: 'User retrieved successfully'
        });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    try {
        res.cookie('accessToken', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error during logout'
        });
    }
};


export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "No refresh token" });
        }

        // 1. Verify the token (using the Refresh Secret)
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // 2. Security Check: Find user AND ensure this specific RT is the one stored in DB
        const user = await User.findOne({ _id: decoded.userId, refreshToken: refreshToken });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid session" });
        }

        // 3. Generate NEW set of tokens (Rotation)
        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        // 4. Update the database with the new Refresh Token
        user.refreshToken = newRefreshToken;
        await user.save();

        // 5. Update BOTH cookies
        // Access Token Cookie (15 mins)
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        // Refresh Token Cookie (7 days)
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // 6. Return NEW Access Token in JSON
        // This is required so the Frontend Axios Interceptor can catch it and retry the failed request
        res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (error) {
        // If JWT verify fails (expired or tampered), catch it here
        res.status(403).json({
            success: false,
            message: 'Refresh token expired or invalid'
        });
    }
};