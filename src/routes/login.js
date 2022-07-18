import { Router, json } from 'express'
import login from '../controllers/login.js'

const router = Router()
console.log('uwu')
router.post('/login', login)

export default router