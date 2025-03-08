import {PrismaClient} from '@prisma/client'
import PatientsRepository from '../Repository/PatientsRepository.js'
import DoctorRepository from '../Repository/DoctorRepository.js'

class NotificationValidations{
    constructor(){

    }

    modelValidation(notification){
        const fields = ['Message', 'DoctorId', 'PatientId',]
        const validation = {
            state: false,
            message: ''
        }
        fields.forEach(field => {
            if(field in notification === false) return validation.state = true,
            validation.message = `The model is not completed ${field} is missing`
        })

        return validation
    }

    async validatePatientHasNotification(userId){
        const patient = await PatientsRepository.FindPatientByUserId(userId)
        if(patient === null){
            return true
        }else{
            return false
        }
    }

    async validateDoctorHasNotification(userId){
        const doctor = await DoctorRepository.FindDoctorByUserId(userId)
        if(doctor === null){
            return true
        }else{
            return false
        }
    }
}

export default new NotificationValidations()