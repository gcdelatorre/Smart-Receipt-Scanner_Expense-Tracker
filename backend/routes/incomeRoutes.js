import express from 'express'
import { addIncome, getAllIncome, updateIncomeById, deleteIncomeById, getSingleIncomeById } from "../controllers/incomeController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

// All routes require authentication
router.use(protect);

router.post("/", addIncome);
router.get("/", getAllIncome);
router.get("/:id", getSingleIncomeById);
router.put("/:id", updateIncomeById);
router.delete("/:id", deleteIncomeById);

export default router
