import express from "express"
import { updateProfile } from "../controllers/profileController.js";
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../schemas/user.schema.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router()

router.put('/update', authLimiter, protect, validate(updateProfileSchema), updateProfile);

export default router;
