import express from 'express'
import { addExpense, getAllExpense, updateExpenseById, deleteExpenseById, getSingleExpenseById, getSpendingAnalytics } from "../controllers/expenseController.js";
import { createExpenseFromReceipt, upload } from "../controllers/uploadController.js";
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { expenseTransactionSchema } from '../schemas/transaction.schema.js';
import { apiLimiter, uploadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router()

// All routes require authentication
router.use(protect);
router.use(apiLimiter)

router.get("/", getAllExpense)
router.get("/analytics", getSpendingAnalytics)
router.get("/:id", getSingleExpenseById)

router.post("/", validate(expenseTransactionSchema), addExpense)
router.post("/upload", uploadLimiter, upload.single("image"), createExpenseFromReceipt)

router.put("/:id", validate(expenseTransactionSchema), updateExpenseById)

router.delete("/:id", deleteExpenseById)

export default router
