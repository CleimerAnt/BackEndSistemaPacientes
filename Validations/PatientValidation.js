import {PrismaClient} from '@prisma/client'

class PatientValidation{
    constructor() {}

    ModelValidation(Patient){
        const verify = "Gender" in Patient && "BirthDate" in Patient && "PhoneNumber" in Patient && "Addres" in Patient && "UserId" in Patient  && "MedicalAppointmentsId" in Patient && "MedicalPrescriptionsId" in Patient

        return verify
    }

    async UserAddedValidation(UserId){
        const prisma = new PrismaClient();
        const user = await prisma.users.findFirst({
            where:{
                Id: UserId
            }
        })
        if(user !== null){
            return true
        }else{
            return false
        }
    }
}

export default new PatientValidation();