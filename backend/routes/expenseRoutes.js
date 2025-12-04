import express from 'express'
import { addExpense, getAllExpense } from "../controllers/expenseController.js";

const router = express.Router()

router.get("/", getAllExpense)
router.post("/", addExpense)

export default router