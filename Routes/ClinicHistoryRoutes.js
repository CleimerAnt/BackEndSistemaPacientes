import express from 'express'
import ClinicHistoryController from '../Controller/ClinicHistoryController.js'
import JWT from 'jsonwebtoken'
const router = express.Router()

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).send({msg: 'No token provided'})
    }

    const data = JWT.verify(token, process.env.SECRET_JWTKEY)

    if(!data){
        return;
    }

    req.user = data;

    next();
}

router.post('/', authMiddleware, ClinicHistoryController.Add)

router.route('/:patientId')
    .get(authMiddleware, ClinicHistoryController.GetByPatientId)
    .put(authMiddleware, ClinicHistoryController.PutClinicHistory)

export default router;