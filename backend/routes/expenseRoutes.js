import express from 'express'
import { addExpense, getAll } from "../controllers/expenseController.js";
import { createExpenseWithUpload, upload } from "../controllers/uploadController.js";

const router = express.Router()

router.get("/", getAll)
router.post("/", addExpense)
router.post("/upload", upload.single("image"), createExpenseWithUpload)

export default router
