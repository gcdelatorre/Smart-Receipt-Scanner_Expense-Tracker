import express from 'express'
import { addExpense, getAllExpense } from "../controllers/expenseController.js";
import { uploadExpense, upload } from "../controllers/uploadController.js";

const router = express.Router()

router.get("/", getAllExpense)
router.post("/", addExpense)
router.post("/upload", upload.single("image"), uploadExpense)

export default router
