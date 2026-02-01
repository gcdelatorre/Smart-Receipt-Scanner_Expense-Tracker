import express from 'express';
import { register, login, getMe, logout, refreshToken, changePassword, deleteAccount } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { changePasswordSchema } from '../schemas/user.schema.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/refresh-token', authLimiter, refreshToken);
router.put('/change-password', authLimiter, protect, validate(changePasswordSchema), changePassword);
router.delete('/delete-account', authLimiter, protect, deleteAccount);

export default router;
