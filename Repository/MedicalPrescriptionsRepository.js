import {PrismaClient} from '@prisma/client';
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

class MedicalPrescriptionsRepository{
    constructor () {}

    async Add(MedicalPrescriptions){
        MedicalPrescriptions.Id = randomUUID();
        const newPrescriptions = await prisma.medicalPrescriptions.create({
            data: {...MedicalPrescriptions}
        })

        return {
            Date: newPrescriptions.Date,
            Medication: newPrescriptions.Medication,
            Indications: newPrescriptions.Indications,
            DoctorId: newPrescriptions.DoctorId,
            PatientId: newPrescriptions.PatientId
        }
    }  

    async GetAllMedicalPrescriptionsByPatientId(PatientId){
        const MedicalPrescriptions = await prisma.medicalPrescriptions.findFirst({
            where:{
                PatientId: PatientId
            }
        })

        return {
            Date: MedicalPrescriptions.Date,
            Medication: MedicalPrescriptions.Medication,
            Indications: MedicalPrescriptions.Indications,
            DoctorId: MedicalPrescriptions.DoctorId,
            PatientId: MedicalPrescriptions.PatientId
        }
    }

    async GetAllMedicalPrescriptions(){
        const MedicalPrescriptions = await prisma.medicalPrescriptions.findMany();
        return MedicalPrescriptions;
    }
    
    async GetMedicalPrescriptionsByPatientIdAndDoctorId(PatientId, DoctorId){
        const MedicalPrescriptions = await prisma.medicalPrescriptions.findMany({
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

        return MedicalPrescriptions;
    }

    async UpdateMedicalPrescriptions(Id,MedicalPrescriptions){
        const EditMedicalPrescriptions = await prisma.medicalPrescriptions.update({
            where:{
                Id: Id
            },
            data:{
                Date: MedicalPrescriptions.Date,
                Medication: MedicalPrescriptions.Medication,
                Indications: MedicalPrescriptions.Indications
            }
        })

        return {
            Date: EditMedicalPrescriptions.Date,
            Medication: EditMedicalPrescriptions.Medication,
            Indications: EditMedicalPrescriptions.Indications
        }
    }

    async Delete(Id){
        const MedicalPrescriptions = await prisma.medicalPrescriptions.delete({
            where:{
                Id: Id
            }
        })

        return MedicalPrescriptions;
    }
}

export default new MedicalPrescriptionsRepository();