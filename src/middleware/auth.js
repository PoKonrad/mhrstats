import jwt from 'jsonwebtoken'
import { json } from 'express'

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
            }
            req.decoded = decoded;
            next()
        })
    }
}

export default auth