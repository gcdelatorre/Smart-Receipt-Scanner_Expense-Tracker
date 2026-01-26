import express from 'express'
import { getUser, updateUserBudgets, updateUserSettingsPreferences } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

// All routes require authentication
router.use(protect);

router.get("/me", getUser)
router.put("/budget", updateUserBudgets)
router.put("/settings-preferences", updateUserSettingsPreferences)

export default router