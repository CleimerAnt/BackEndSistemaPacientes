import PatientsRepository from "../Repository/PatientsRepository.js";
import PatientValidation from "../Validations/PatientValidation.js";
import JWT from 'jsonwebtoken'

class PatientsController{
    constructor(){}

    async Register(req, res){
        try{
            const patient = req.body;
            const modelvalidation = PatientValidation.ModelValidation(patient)
            if(!modelvalidation){
                return res.status(400).send({msg:"The model is not completed"})
            }
            const userValidation = await PatientValidation.UserAddedValidation(patient.UserId)
            if(userValidation){
                return res.status(400).send({msg:'The patiend is added'})
            }
            const token = req.cookies.accessToken
            const data = JWT.verify(token, process.env.SECRET_JWTKEY)
            if(data === null){
                return res.status(400)
            }
            const newPatient = await PatientsRepository.Add(patient)
            res.status(201).send(newPatient)
        }catch(e){
            res.status(500).send({msg: e.message})
        }
    }
}

export default new PatientsController()