import express from 'express'
import { getUser, addUser } from "../controllers/userController.js";

const router = express.Router()

router.get("/:id", getUser)
router.post("/", addUser)

export default router