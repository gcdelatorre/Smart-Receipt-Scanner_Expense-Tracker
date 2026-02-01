import express from 'express'
import { addIncome, getAllIncome, updateIncomeById, deleteIncomeById, getSingleIncomeById } from "../controllers/incomeController.js";
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { incomeTransactionSchema } from '../schemas/transaction.schema.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router()

// All routes require authentication
router.use(protect);
router.use(apiLimiter)

router.post("/", validate(incomeTransactionSchema), addIncome);
router.get("/", getAllIncome);
router.get("/:id", getSingleIncomeById);
router.put("/:id", validate(incomeTransactionSchema), updateIncomeById);
router.delete("/:id", deleteIncomeById);

export default router
