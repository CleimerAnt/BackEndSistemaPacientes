import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

class MedicalAppointmentsValidation{
    constructor() {}

    modelValidation(medicalAppointment){
        const fields = ['DateTime', 'ReasonToConsulted', 'State','DoctorId','PatientsId']
        const validation = {
            state: false,
            message: ''
        }
        fields.forEach(field => {
            if(field in medicalAppointment === false) return validation.state = true,
            validation.message = `The model is not completed ${field} is missing`
        })

        return validation
    }

    async isAdded(Id){
        const medicalAppointment = await prisma.medicalAppointments.findFirst({
            where:{
                Id:Id
            }
        })
        if(medicalAppointment)return true
        else return false
    }
}

export default new MedicalAppointmentsValidation();