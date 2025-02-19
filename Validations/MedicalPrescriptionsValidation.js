import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

class MedicalPrescriptionsValidation{
    constructor() {}

    modelValidation(MedicalPrescription){
        const fields = ['Date', 'Medication', 'Indications','DoctorId','PatientId']
        const validation = {
            state: false,
            message: ''
        }
        fields.forEach(field => {
            if(field in MedicalPrescription === false) return validation.state = true,
            validation.message = `The model is not completed ${field} is missing`
        })

        return validation
    }

    async isAdded(Id){
        const MedicalPrescriptions = await prisma.medicalPrescriptions.findFirst({
            where:{
                Id:Id
            }
        })
        if(MedicalPrescriptions)return true
        else return false
    }

    EditmodelValidation(MedicalPrescription){
        const fields = ['Date', 'Medication', 'Indications']
        const validation = {
            state: false,
            message: ''
        }
        fields.forEach(field => {
            if(field in MedicalPrescription === false) return validation.state = true,
            validation.message = `The model is not completed ${field} is missing`
        })

        return validation
    }
}

export default new MedicalPrescriptionsValidation();