import jwt from 'jsonwebtoken'

const login = (req, res) => {
    const postData = req.body;
    const user = {
        'email': postData.email,
        'name': postData.name
    }
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.TOKEN_LIFE })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE })
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken
    }
    res.status(200).json(response)
}

export default login