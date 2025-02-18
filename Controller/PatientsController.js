import PatientsRepository from "../Repository/PatientsRepository.js";
import PatientValidation from "../Validations/PatientValidation.js";

class PatientsController{
    constructor(){
    }

    async Register(req, res){
        try{
            const patient = req.body;
            const modelvalidation = PatientValidation.ModelValidation(patient)
            console.log(modelvalidation)
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }
            const userValidation = await PatientValidation.AddedValidation(patient)
            if(userValidation === true){
                return res.status(400).send({msg:'The patiend is added'})
            }
            const newPatient = await PatientsRepository.Add(patient)
            res.status(201).send(newPatient)
        }catch(e){
            res.status(500).send({msg: e.message})
        }
    }

    async GetAll(req,res){
        try{
            const patients = await PatientsRepository.GetAllPatients()
            if(patients.length === 0){
                return res.status(204).json({msg:'No content'})
            }
            res.status(200).send({data:patients})
        }catch(e){
            res.status(500).send({msg:e.message})
        }
    }

    async GetById(req,res){
        try{
            const {Id} = req.params;
            const patiend = await PatientsRepository.FindPatientById(Id)
            if(patiend === null) return res.status(204).send({msg:'No content'})
            res.status(200).send({data:patiend})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async PutPatient(req,res){
        try{
            const patient = req.body;
            const {Id} = req.params
            const modelvalidation = PatientValidation.ModelEditValidation(patient)
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }
            const editPatient = await PatientsRepository.EditPatient(Id, patient)
            if(editPatient === null){
                return res.status(404).send({msg:'The patient is not added'})
            }
            console.log(editPatient);
            res.status(200).send({data: editPatient})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async DeletePatient(req,res){
        try{
            const {Id} = req.params
            const DeletePatient = await PatientsRepository.DeletePatient(Id)
            if(DeletePatient === null){
                return res.status(404).send({msg:'The patient is not added'})
            }
            return res.status(200).send({msg:'Patient Deleted'})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

}

export default new PatientsController()