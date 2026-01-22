import express from "express"
import { updateProfile } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.put('/update', protect, updateProfile);

export default router;
