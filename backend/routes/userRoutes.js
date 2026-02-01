import express from 'express'
import { getUser, updateUserBudgets, updateSettings } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateBudgetSchema } from '../schemas/user.schema.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router()

// All routes require authentication
router.use(protect);
router.use(apiLimiter)

router.get("/me", getUser)
router.put("/budget", validate(updateBudgetSchema), updateUserBudgets)
router.put("/settings-preferences", updateSettings)

export default router