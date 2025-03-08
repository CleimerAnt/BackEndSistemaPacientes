import {PrismaClient} from '@prisma/client'
import PatientsRepository from '../Repository/PatientsRepository.js'
import DoctorRepository from '../Repository/DoctorRepository.js'
const prisma = new PrismaClient()

class NotificationValidations{
    constructor(){

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