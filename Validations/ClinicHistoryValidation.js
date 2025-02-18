
class ClinicHistoryValidation{
    constructor() {}

    ModelValidation(ClinicHistory){
        const fields = ['PreviousIllnesses', 'Allergies', 'CurrentTreatments', 'DateOfLastConsultation', 'PatientId'];
        let validation = {
            state:false,
            message:''
        }
        fields.forEach(field => {
            if(field in ClinicHistory === false){
                validation.state = true, validation.message = `The model is not completed the ${field} is missing`
            }
        })
        return validation;
    }

    ModelEditValidation(ClinicHistory){
            const fields = ['PreviousIllnesses', 'Allergies', 'CurrentTreatments', 'DateOfLastConsultation']; 
            let validation = {
                state:false,
                message:''
            }
            fields.forEach(field => {
                if(field in ClinicHistory === false){
                    validation.state = true, validation.message = `The model is not completed the ${field} is missing`
                }
            })
            return validation;
        }
}


export default new ClinicHistoryValidation();