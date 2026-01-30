import express from 'express';
import { register, login, getMe, logout, refreshToken, changePassword, deleteAccount } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { changePasswordSchema } from '../schemas/user.schema.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/refresh-token', refreshToken);
router.put('/change-password', protect, validate(changePasswordSchema), changePassword);
router.delete('/delete-account', protect, deleteAccount);

export default router;
