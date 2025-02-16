import PatientsRepository from '../Repository/PatientsRepository.js';

class PatientValidation{
    constructor() {}

    ModelValidation(Patient){
        const verify = "Gender" in Patient && "BirthDate" in Patient && "PhoneNumber" in Patient && "Addres" in Patient && "UserId" in Patient  

        return verify
    }

    async AddedValidation(Patient){
            const patient = await PatientsRepository.FindPatientByUserId(Patient.UserId)
            if(patient !== null){
                return true
            }else{
                return false
            }
        }

    ModelEditValidation(Patient){
            const verify = "Gender" in Patient && "BirthDate" in Patient && "PhoneNumber" in Patient && "Addres" in Patient  
    
            return verify
        }
}


export default new PatientValidation();