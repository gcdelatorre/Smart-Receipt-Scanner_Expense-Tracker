import express from 'express'
import { addExpense, getAllExpense, updateExpenseById, deleteExpenseById, getSingleExpenseById, getSpendingAnalytics } from "../controllers/expenseController.js";
import { createExpenseFromReceipt, upload } from "../controllers/uploadController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

// All routes require authentication
router.use(protect);

router.get("/", getAllExpense)
router.get("/analytics", getSpendingAnalytics)
router.get("/:id", getSingleExpenseById)

router.post("/", addExpense)
router.post("/upload", upload.single("image"), createExpenseFromReceipt)

router.put("/:id", updateExpenseById)

router.delete("/:id", deleteExpenseById)

export default router
