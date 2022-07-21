import dotenv from 'dotenv'
import express, { json } from "express"
import login from './src/routes/login.js'
import auth from './src/middleware/auth.js'
import data from './src/routes/data.js'

dotenv.config()
const app = express()
app.use(json({ 
    limit: '1MB'
}));
app.use('/auth', login)
app.use('/data', data)

app.use('/uwu', auth)
app.get('/uwu', (req, res) => {
    res.json('uwu')
})

app.listen(8000)
