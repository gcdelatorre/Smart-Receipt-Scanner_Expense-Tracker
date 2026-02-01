import express from "express";
import { getTransaction } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/", apiLimiter, protect, getTransaction);

export default router;