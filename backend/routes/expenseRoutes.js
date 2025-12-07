import express from 'express'
import { addExpense, getAllExpense, updateExpenseById, deleteExpenseById, getSingleExpenseById } from "../controllers/expenseController.js";
import { createExpenseWithUpload, upload } from "../controllers/uploadController.js";

const router = express.Router()

router.get("/", getAllExpense)
router.get("/:id", getSingleExpenseById)

router.post("/", addExpense)
router.post("/upload", upload.single("image"), createExpenseWithUpload)

router.put("/:id", updateExpenseById)

router.delete("/:id", deleteExpenseById)

export default router
