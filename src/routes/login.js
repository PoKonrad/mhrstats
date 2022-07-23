import { Router } from 'express'
import login from '../controllers/login.js'
import register from '../controllers/register.js'
import refreshToken from '../controllers/refreshToken.js'

const router = Router()
console.log('uwu')
router.post('/login', login)
router.post('/register', register)
router.post('/refreshToken', refreshToken)

export default router