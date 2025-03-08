import express from 'express';
import JWT from 'jsonwebtoken';
import MedicalAppointmentController from '../Controller/MedicalAppointmentController.js';
const router = express.Router();

const authMiddleware = (req, res,next) => {
    const token = req.cookies.accessToken;
    if(!token){
        res.status(401).send({msg:'No token provided'})
    }
    try{
    const data = JWT.verify(token, process.env.SECRET_JWTKEY);
    req.user = data
    next();
    }catch(error){
        return res.status(403).send({ msg: "Invalid token" });
    }
}

router.get('/getByPatientId/:patientId',MedicalAppointmentController.GetMedicalAppointmentByPatientId)
router.get('/:PatientId/:DoctorId', authMiddleware,MedicalAppointmentController.GetByPatientAndDoctor)
router.get('/:DoctorId', authMiddleware, MedicalAppointmentController.GetByDoctorId)
router.post('/', authMiddleware, MedicalAppointmentController.Post)
router.get('/', authMiddleware, MedicalAppointmentController.GetAllMedicalAppointments)
router.put('/changeState/:Id', authMiddleware, MedicalAppointmentController.ChangeState)
router.delete('/deleteAllMedicalAppointmentsForPatient/:patientId', authMiddleware, MedicalAppointmentController.DeleteMedicalAppointmentsForPatient)   


router.route('/:Id')
    .put(authMiddleware, MedicalAppointmentController.ReprogrammingMedicalAppointment)
    .delete(authMiddleware, MedicalAppointmentController.DeleteMedicalAppointment)
    
export default router;