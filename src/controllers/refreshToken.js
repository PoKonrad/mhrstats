import dbQuery from "../configs/database.js"
import generateToken from "../scripts/generateToken.js"

const refreshToken = async (req, res) => {
    const refToken = req.body.refreshToken

    const dbResp = await dbQuery('SELECT refresh.token, refresh.expiration, refresh.user_id, users.username FROM refresh INNER JOIN users ON users.id = refresh.user_id WHERE refresh.token = ?', [refToken])
    console.log(dbResp[0])
    if(new Date(dbResp[0].expiration) < new Date()) {
        res.status(400).json("Token Expired")
        return
    }

    res.status(200).json(await generateToken(dbResp[0].username, dbResp[0].user_id))
}

export default refreshToken