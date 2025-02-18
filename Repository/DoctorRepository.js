import {PrismaClient} from "@prisma/client";
import {randomUUID} from 'crypto'
const prisma = new PrismaClient();

class DoctorRepository{
    constructor() {} 

    async GetAllDoctors(){
        const Doctors = await prisma.doctors.findMany();
        return Doctors
    }

    async Add(Doctor = []){
        Doctor.Id = randomUUID()

        const newDoctor = await prisma.doctors.create({
            data: {
                ...Doctor
            }
        })
        
        return {
            Speciality: newDoctor.Speciality,
            Disponibility: newDoctor.Disponibility,
            PhoneNumber: newDoctor.PhoneNumber,
        };
    }

    async FindDoctorById(id){
        const Doctor = await prisma.doctors.findFirst({
            where:{
                Id:id
            }
        })

        return Doctor
    }

    async FindDoctorByUserId(UserId){
        const Doctor = await prisma.doctors.findFirst({
            where:{
                UserId:UserId
            }
        })
        return Doctor
    }
    async EditDoctor(Id, Doctor){
        const verifyDoctor = await this.FindDoctorById(Id)
        if(verifyDoctor === null) return null;

        const newDoctor = await prisma.doctors.update({
            where:{
                Id:Id
            },
            data:{
                Disponibility: Doctor.Disponibility,
                PhoneNumber: Doctor.PhoneNumber,
                Speciality: Doctor.Speciality
            }
        })
        return {
            Disponibility: newDoctor.Disponibility,
            PhoneNumber: newDoctor.PhoneNumber,
            Speciality: newDoctor.Speciality
        }
    }

    async DeleteDoctor(Id){
        const verifyDoctor = await this.FindDoctorById(Id)
        if(verifyDoctor === null) return null;

        const Doctor = await prisma.doctors.delete({
            where:{
                Id:Id
            }
        })

        return {
            Disponibility: Doctor.Disponibility,
            PhoneNumber: Doctor.PhoneNumber,
            Speciality: Doctor.Speciality
        }
    }
}


export default new DoctorRepository();