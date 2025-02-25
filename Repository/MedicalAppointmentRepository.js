import {PrismaClient} from '@prisma/client';
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

class MedicalAppointmentRepository{
    constructor () {}

    async Add(medicalAppointment){
        medicalAppointment.Id = randomUUID();
        const newMedicalAppointment = await prisma.medicalAppointments.create({
            data: {...medicalAppointment}
        })

        return {
            Datetime: newMedicalAppointment.DateTime,
            ReasonToConsuted: newMedicalAppointment.ReasonToConsulted,
            State: newMedicalAppointment.State,
            DoctorId: newMedicalAppointment.DoctorId,
            PatientsId: newMedicalAppointment.PatientsId
        }
    }  

    async GetAllMedicalAppointments(){
        const medicalAppointment = await prisma.medicalAppointments.findMany();
        return medicalAppointment;
    }
    
    async GetMedicalAppointmentByPatientIdAndDoctorId(PatientId, DoctorId){
        const medicalAppointment = await prisma.medicalAppointments.findMany({
            where:{
                AND:[
                    {DoctorId: DoctorId},
                    {PatientsId: PatientId}
                ]
            },
            include:{
                Patient: true,
                Doctor: true
            }
        })

        return medicalAppointment;
    }

    async GetMedicalAppointmentByDoctorId(DoctorId){
        const medicalAppointment = await prisma.medicalAppointments.findMany({
            where:{
                DoctorId: DoctorId
            },
            include:{
                Patient: true,
                Doctor: true
            }
        })

        return medicalAppointment;
    }


    async ReprogrammingMedicalAppointment(Id, DateTime){
        const medicalAppointment = await prisma.medicalAppointments.update({
            where:{
                Id:Id
            },
            data:{
                DateTime: DateTime
            }
        })

        return medicalAppointment;
    }

    async Delete(Id){
        const medicalAppointment = await prisma.medicalAppointments.delete({
            where:{
                Id: Id
            }
        })

        return medicalAppointment;
    }
}

export default new MedicalAppointmentRepository();