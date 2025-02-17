import PatientsRepository from '../Repository/PatientsRepository.js';

class PatientValidation{
    constructor() {}

    ModelValidation(Patient){
        const fields = ['Gender', 'BirthDate', 'PhoneNumber', 'Addres', 'UserId'];
        let validation = {
            state:false,
            message:''
        }
        fields.forEach(field => {
            if(field in Patient === false){
                validation.state = true, validation.message = `The model is not completed the ${field} is missing`
            }
        })
        return validation;
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
            const fields = ["Gender", "BirthDate", "PhoneNumber",  "Addres"] 
            let validation = {
                state:false,
                message:''
            }
            fields.forEach(field => {
                if(field in Patient === false){
                    validation.state = true, validation.message = `The model is not completed the ${field} is missing`
                }
            })
            return validation;
        }
}


export default new PatientValidation();