import { Router } from "express";
import auth from "../middleware/auth.js"
import postData from "../controllers/newData.js"

const router = new Router()

router.use('/', auth)

router.post('/', postData)

export default router