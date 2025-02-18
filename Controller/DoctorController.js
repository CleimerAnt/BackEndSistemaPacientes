import DoctorRepository from "../Repository/DoctorRepository.js";
import DoctorValidation from "../Validations/DoctorValidation.js";

class DoctorController{
    constructor(){
    }

    async Register(req, res){
        try{
            const doctor = req.body;
            const modelvalidation = DoctorValidation.ModelValidation(doctor)
            
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }
            const userValidation = await DoctorValidation.AddedValidation(doctor)
            if(userValidation === true){
                return res.status(400).send({msg:'The doctor is added'})
            }
            const newDoctor = await DoctorRepository.Add(doctor)
            res.status(201).send(newDoctor)
        }catch(e){
            res.status(500).send({msg: e.message})
        }
    }

    async GetAll(req,res){
        try{
            const doctors = await DoctorRepository.GetAllDoctors()
            if(doctors.length === 0){
                return res.status(204).json({msg:'No content'})
            }
            res.status(200).send({data:doctors})
        }catch(e){
            res.status(500).send({msg:e.message})
        }
    }

    async GetById(req,res){
        try{
            const {Id} = req.params;
            const doctor = await DoctorRepository.FindDoctorById(Id)
            if(doctor === null) return res.status(204).send({msg:'No content'})
            res.status(200).send({data:doctor})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async PutDoctor(req,res){
        try{
            const doctor = req.body;
            const {Id} = req.params
            const modelvalidation = DoctorValidation.ModelEditValidation(doctor)
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }
            const editDoctor = await DoctorRepository.EditDoctor(Id, doctor)
            if(editDoctor === null){
                return res.status(404).send({msg:'The doctor is not added'})
            }
            
            res.status(200).send({data: editDoctor})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async DeleteDoctor(req,res){
        try{
            const {Id} = req.params
            const DeleteDoctor = await DoctorRepository.DeleteDoctor(Id)
            if(DeleteDoctor === null){
                return res.status(404).send({msg:'The doctor is not added'})
            }
            return res.status(200).send({msg:'Doctor Deleted'})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

}

export default new DoctorController()