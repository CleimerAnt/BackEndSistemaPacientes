import {PrismaClient} from '@prisma/client'
import { randomUUID } from 'crypto';
const prisma = new PrismaClient()

class NotificationsRepository{
    constructor(){

    }

    async Add(notification){
        notification.Id = randomUUID()
        const Notification = await prisma.notifications.create({
            data: {...notification}
        })

        return Notification;
    }

    async GetByDoctorId(doctorId){
        const doctor = await prisma.doctors.findFirst({
            where:{
                UserId: doctorId
            }
        })

        const notifications = await prisma.notifications.findMany({
            where:{
                DoctorId: doctor.Id
            }
        })

        return notifications
    }

    async GetByPatientId(patientId){
        const patient = await prisma.patients.findFirst({
            where:{
                UserId: patientId
            }
        })

        const notifications = await prisma.notifications.findMany({
            where:{
                PatientId: patient.Id
            }
        })

        return notifications
    }
}

export default new NotificationsRepository()