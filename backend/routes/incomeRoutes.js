import express from 'express'
import { addIncome, getAllIncome, updateIncomeById, deleteIncomeById, getSingleIncomeById } from "../controllers/incomeController.js";

const router = express.Router()

router.post("/", addIncome);
router.get("/", getAllIncome);
router.get("/:id", getSingleIncomeById);
router.put("/:id", updateIncomeById);
router.delete("/:id", deleteIncomeById);

export default router
