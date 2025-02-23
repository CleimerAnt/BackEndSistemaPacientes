import express from 'express'
import patientController from '../Controller/PatientsController.js'
import JwtManagement from "../Helpers/JwtManagement.js";
const router = express.Router()

const authMiddleware = (req,res,next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).send({ msg: 'No token provided' });
    }

    const data = JwtManagement.Verify(token, res);
    
    if (!data) {
        return; 
    }

    req.user = data; 
    next(); 
}

router.post('/Register', authMiddleware ,patientController.Register)
router.get('/', authMiddleware ,patientController.GetAll)
router.get('/GetByUserId/:UserId', authMiddleware, patientController.GetByUserId)

router.route('/:Id')
    .get(authMiddleware,patientController.GetById)
    .put(authMiddleware,patientController.PutPatient)
    .delete(authMiddleware,patientController.DeletePatient)

export default router;