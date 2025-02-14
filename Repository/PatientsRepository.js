import { PrismaClient } from "@prisma/client";
import { error } from "console";
import {randomUUID} from 'crypto'
const prisma = new PrismaClient()

class PatientsRepository{
    constructor() {} 

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
}

export default new PatientsRepository()