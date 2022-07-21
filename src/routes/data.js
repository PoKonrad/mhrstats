import { Router } from "express";
import authMiddleware from "../middleware/auth.js"
import postData from "../controllers/newData.js"
//import players from "../controllers/players.js"
import monsters from "../controllers/monsters.js"

const router = Router()

// router.use('/', authMiddleware)

router.post('/add', postData)
router.get('/monsters', monsters)
//router.get('/players', players)

export default router