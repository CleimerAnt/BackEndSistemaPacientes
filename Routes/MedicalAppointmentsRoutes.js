import express from 'express';
import JWT from 'jsonwebtoken';
import MedicalAppointmentController from '../Controller/MedicalAppointmentController.js';
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

router.get('/', authMiddleware, MedicalAppointmentController.GetAllMedicalAppointments)
router.get('/:PatientId/:DoctorId', authMiddleware,MedicalAppointmentController.GetByPatientAndDoctor)
router.get('/:DoctorId', authMiddleware, MedicalAppointmentController.GetByDoctorId)
router.post('/', authMiddleware, MedicalAppointmentController.Post)
router.delete('/deleteAllMedicalAppointmentsForPatient/:patientId', authMiddleware, MedicalAppointmentController.DeleteMedicalAppointmentsForPatient)   

router.route('/:Id')
    .put(authMiddleware, MedicalAppointmentController.ReprogrammingMedicalAppointment)
    .delete(authMiddleware, MedicalAppointmentController.DeleteMedicalAppointment)

export default router;