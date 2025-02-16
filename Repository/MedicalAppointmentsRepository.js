import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

class MedicalappointmentsRepository{
    constructor() {}

    async findMedicalAppointmentsById(id){
        var medicalappointments = await prisma.medicalAppointments.findFirst({
            where:{
                Id:id
            }
        })

        return medicalappointments;
    }
}

export default new MedicalappointmentsRepository();