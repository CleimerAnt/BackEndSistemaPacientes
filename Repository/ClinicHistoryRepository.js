import {PrismaClient} from "@prisma/client";
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

class ClinicHistoryRepository{
    constructor() {} 

    async Add(ClinicHistory){
        ClinicHistory.Id = randomUUID();
        const newClinicHistory = await prisma.clinicHistory.create({
            data:{
                ...ClinicHistory
            }
        })

        return {
            PreviousIllnesses: newClinicHistory.PreviousIllnesses,
            Allergies: newClinicHistory.Allergies,
            CurrentTreatments: newClinicHistory.CurrentTreatments,
            DateOfLastConsultation: newClinicHistory.DateOfLastConsultation,
            PatientId: newClinicHistory.PatientId
        }
    }

    async FindClinicHistoryById(id){
        const clinicHistory = await prisma.clinicHistory.findFirst({
            where:{
                Id:id
            }
        })

        return clinicHistory
    }

    async GetClinicHistoryByPatientId(Id){
        const clinicHistory = await prisma.clinicHistory.findFirst({
            where:{
                PatientId: Id 
            }
        })

        return clinicHistory;
    }

    async EditClinicHistory(Id, ClinicHistory){
        const verifyClinicHistory = await this.FindClinicHistoryById(Id)
        if(verifyClinicHistory === null) return null;

        const newClinicHistory = await prisma.clinicHistory.update({
            where:{
                Id:Id
            },
            data:{
                PreviousIllnesses: ClinicHistory.PreviousIllnesses,
                Allergies: ClinicHistory.Allergies,
                CurrentTreatments: ClinicHistory.CurrentTreatments,
                DateOfLastConsultation: ClinicHistory.DateOfLastConsultation
            }
        })
        return {
            PreviousIllnesses: newClinicHistory.PreviousIllnesses,
            Allergies: newClinicHistory.Allergies,
            CurrentTreatments: newClinicHistory.CurrentTreatments,
            DateOfLastConsultation: newClinicHistory.DateOfLastConsultation
        }
    }
}

export default new ClinicHistoryRepository();