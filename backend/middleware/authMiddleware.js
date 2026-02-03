import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { checkAndResetBudgets } from '../services/userService.js';

export const protect = async (req, res, next) => {
    try {
        let accessToken;

        // Check for token in cookies first, then Authorization header
        if (req.cookies && req.cookies.accessToken) {
            accessToken = req.cookies.accessToken;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        }

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token provided'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

            // Get user from token (exclude password)
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Check for monthly budget reset
            const wasReset = await checkAndResetBudgets(req.user);
            req.user.wasBudgetReset = wasReset;

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during authentication'
        });
    }
};
