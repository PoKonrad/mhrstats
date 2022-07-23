import { Router } from "express";
import authMiddleware from "../middleware/auth.js"
import postData from "../controllers/newData.js"
//import players from "../controllers/players.js"
import stats from "../controllers/stats.js"

const router = Router()
router.use('/', authMiddleware)

router.post('/add', postData)
router.get('/stats', stats)
//router.get('/players', players)

export default router