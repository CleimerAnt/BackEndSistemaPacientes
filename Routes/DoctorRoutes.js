import express from 'express'
import DoctorController from '../Controller/DoctorController.js'
import JWT from 'jsonwebtoken'
const router = express.Router()

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).send({msg: 'No token provided'})
    }

    const data = JWT.verify(token, process.env.SECRET_JWTKEY)
    if(data.Rol !== 'Doctor'){
        return res.status(401).send({msg: 'You dont have access'})
    }

    if(!data){
        return;
    }

    req.user = data;

    next();
}

router.post('/',authMiddleware,DoctorController.Register)
router.get('/', authMiddleware, DoctorController.GetAll)

router.route('/:Id')
    .get(authMiddleware, DoctorController.GetById)
    .put(authMiddleware, DoctorController.PutDoctor)
    .delete(authMiddleware, DoctorController.DeleteDoctor)
export default router;