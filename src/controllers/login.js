import db from '../configs/database.js'
import argon2 from 'argon2'
import generateToken from '../scripts/generateToken.js'

const login = async (req, res) => {
    const postData = req.body;
    const dbResp = await db("SELECT id, username, password FROM users WHERE username = ?", [postData.username, postData.password])
    console.log(postData.username)
    if (dbResp.length === 0) {
        res.status(400).json("No such user")
        return
    }

    if (await argon2.verify(dbResp[0].password, postData.password)) {
        console.log('Success!')
        res.status(200).json(await generateToken(dbResp[0].username, dbResp[0].id))
    } else {
        res.status(400).json("Wrong login stuff")
    }
}

export default login