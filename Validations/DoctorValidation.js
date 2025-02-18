import DoctorRepository from "../Repository/DoctorRepository.js";

class DoctorValidation{
    constructor() {}

    ModelValidation(Doctor){
        const fields = ['Speciality', 'PhoneNumber', 'Disponibility', 'UserId'];
        let validation = {
            state:false,
            message:''
        }
        fields.forEach(field => {
            if(field in Doctor === false){
                validation.state = true, validation.message = `The model is not completed the ${field} is missing`
            }
        })
        return validation;
    }

    async AddedValidation(Doctor){
            const newDoctor = await DoctorRepository.FindDoctorByUserId(Doctor.UserId)
            if(newDoctor !== null){
                return true
            }else{
                return false
            }
        }

    ModelEditValidation(Doctor){
            const fields = ['Speciality', 'PhoneNumber', 'Disponibility'] 
            let validation = {
                state:false,
                message:''
            }
            fields.forEach(field => {
                if(field in Doctor === false){
                    validation.state = true, validation.message = `The model is not completed the ${field} is missing`
                }
            })
            return validation;
        }
}


export default new DoctorValidation();