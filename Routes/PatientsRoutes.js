import express from 'express'
import patientController from '../Controller/PatientsController.js'
const router = express.Router()

router.post('/', patientController.Register)

export default router;