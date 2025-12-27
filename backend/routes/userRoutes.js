import express from 'express'
import { getUser, addUser, updateUserBudgets } from "../controllers/userController.js";

const router = express.Router()

router.get("/:id", getUser)
router.post("/register", addUser)
router.put("/budget/:id", updateUserBudgets)

export default router