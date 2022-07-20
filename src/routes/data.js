import { Router } from "express";
import authMiddleware from "../middleware/auth.js"
import postData from "../controllers/newData.js"

const router = Router()

// router.use('/', authMiddleware)

router.post('/', postData)

export default router