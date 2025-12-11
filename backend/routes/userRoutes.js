import express from 'express'
import { getUser, addUser, updateUser } from "../controllers/userController.js";

const router = express.Router()

router.get("/:id", getUser)
router.post("/register", addUser)
router.put("/budget/:id", updateUser)

export default router