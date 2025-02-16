import { PrismaClient } from "@prisma/client";
import {randomUUID} from 'crypto'
const prisma = new PrismaClient()

class PatientsRepository{
    constructor() {} 

    async GetAllPatients(){
        const patients = await prisma.patients.findMany();
        return patients
    }

    async Add(Patient = []){
        Patient.Id = randomUUID()

        const newPatient = await prisma.patients.create({
            data: {
                ...Patient
            }
        })
        
        return {
            BirthDate:newPatient.BirthDate,
            Gender:newPatient.Gender,
            PhoneNumber:newPatient.PhoneNumber,
            Addres:newPatient.Addres
        };
    }

    async FindPatientById(id){
        const patient = await prisma.patients.findFirst({
            where:{
                Id:id
            }
        })

        return patient
    }

    async FindPatientByUserId(UserId){
        const patient = await prisma.patients.findFirst({
            where:{
                UserId:UserId
            }
        })
        return patient
    }
    async EditPatient(Id, Patient){
        const verifyPatient = await this.FindPatientById(Id)
        if(verifyPatient === null) return null;

        const patient = await prisma.patients.update({
            where:{
                Id:Id
            },
            data:{
                BirthDate: Patient.BirthDate,
                Gender: Patient.Gender,
                PhoneNumber: Patient.PhoneNumber,
                Addres: Patient.Addres
            }
        })
        return {
            BirthDate : patient.BirthDate,
            Gender: Patient.Gender,
            PhoneNumber: Patient.PhoneNumber,
            Addres: Patient.Addres
        }
    }

    async DeletePatient(Id){
        const verifyPatient = await this.FindPatientById(Id)
        if(verifyPatient === null) return null;

        const patient = await prisma.patients.delete({
            where:{
                Id:Id
            }
        })

        return {
            BirthDate : patient.BirthDate,
            Gender: Patient.Gender,
            PhoneNumber: Patient.PhoneNumber,
            Addres: Patient.Addres
        }
    }
}

export default new PatientsRepository()