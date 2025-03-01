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
        const doctor = await prisma.doctors.findFirst({
            where: {
                UserId: DoctorId
            }
        });

        const medicalAppointment = await prisma.medicalAppointments.findMany({
            where:{
                DoctorId: doctor.Id
            },
            include:{
                Patient:{
                    include: {
                        User:{
                            omit:{
                                Password:true,
                                Id: true
                            }
                        }
                    }
                },
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

    async DeleteAllMedicalAppointmentsOfPatient(patientId){
        await prisma.medicalAppointments.deleteMany({
            where:{
                PatientsId: patientId
            }
        })

        return 'Deleted';
    }
}

export default new MedicalAppointmentRepository();