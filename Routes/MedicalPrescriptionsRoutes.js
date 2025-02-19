import express from 'express';
import JWT from 'jsonwebtoken';
import MedicalPrescriptionsController from '../Controller/MedicalPrescriptionsController.js';
const router = express.Router();

const authMiddleware = (req, res,next) => {
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).send({msg:'No token provided'})
    }

    const data = JWT.verify(token, process.env.SECRET_JWTKEY);

    if(!data){
        return;
    }

    req.user = data
    next();
}

router.post('/',authMiddleware, MedicalPrescriptionsController.Post)

router.route('/:patientId')
    .get(authMiddleware, MedicalPrescriptionsController.GetMedicalPrescriptionByPatientId)
    .delete(authMiddleware, MedicalPrescriptionsController.DeleteMedicalPrescriptions)
    .put(authMiddleware, MedicalPrescriptionsController.PutMedicalPrescriptions)

export default router;