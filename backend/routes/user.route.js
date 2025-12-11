import express from "express"
import { addUser, getUser } from "../controllers/user.controller";

const router = express.Router()

router.get("/", getUser)
router.post("/register", addUser)

export default router