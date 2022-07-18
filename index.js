import dotenv from 'dotenv'
import express, { json } from "express"
import { createPool } from "mariadb"
import login from './src/routes/login.js'
import auth from './src/middleware/auth.js'
import data from './src/routes/data.js'

const pool = createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    connectionLimit: 5
})

dotenv.config()
const app = express()
app.use(json());
app.use('/auth', login)
app.use('/data', data)

app.use('/uwu', auth)
app.get('/uwu', (req, res) => {
    res.json('uwu')
})

app.listen(8000)
