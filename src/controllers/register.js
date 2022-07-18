import jwt from 'jsonwebtoken'
import dbQuery from '../configs/database.js'
import argon2 from 'argon2'

const register = async (req, res) => {
    const userData = req.body
    try{
        const resp = await dbQuery('INSERT INTO users (username, password) VALUES (?, ?)', [userData.username, await argon2.hash(userData.password)])
        console.log(resp)
    } catch (err) {
        console.log(err)
        res.status(500).json("Failure")
    }
    res.status(200).json("Success")

}

export default register