import express from 'express'
import JWT from 'jsonwebtoken'
const router = express.Router()

const authMiddleware = (req,res, next) => {
    const token = req.cookies.accessToken;

    if(!token){
        return res.status(401).send({msg: 'No token provided'})
    }

    const data = JWT.verify(token, process.env.SECRET_JWTKEY)

    if(!data){
        return;
    }

    req.user = data;

    next()
}


export default router