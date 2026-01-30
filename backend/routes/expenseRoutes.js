import express from 'express'
import { addExpense, getAllExpense, updateExpenseById, deleteExpenseById, getSingleExpenseById, getSpendingAnalytics } from "../controllers/expenseController.js";
import { createExpenseFromReceipt, upload } from "../controllers/uploadController.js";
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { expenseTransactionSchema } from '../schemas/transaction.schema.js';

const router = express.Router()

// All routes require authentication
router.use(protect);

router.get("/", getAllExpense)
router.get("/analytics", getSpendingAnalytics)
router.get("/:id", getSingleExpenseById)

router.post("/", validate(expenseTransactionSchema), addExpense)
router.post("/upload", upload.single("image"), createExpenseFromReceipt)

router.put("/:id", validate(expenseTransactionSchema), updateExpenseById)

router.delete("/:id", deleteExpenseById)

export default router
