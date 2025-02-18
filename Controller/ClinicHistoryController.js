import ClinicHistoryValidation from "../Validations/ClinicHistoryValidation.js";
import ClinicHistoryRepository from "../Repository/ClinicHistoryRepository.js";

class ClinicHistoryController{
    constructor(){}

    async Add(req,res){
        try{
            const clinicHistory = req.body;
            const modelvalidation = ClinicHistoryValidation.ModelValidation(clinicHistory)
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }

            const newClinicHistory = await ClinicHistoryRepository.Add(clinicHistory)
            return res.status(201).send(newClinicHistory)
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async GetByPatientId(req,res){
        try{
            const {patientId} = req.params;
            console.log(patientId)
            const clinicHistory = await ClinicHistoryRepository.GetClinicHistoryByPatientId(patientId)
            if(clinicHistory === null) return res.status(204).send({msg:'No content'})
            return res.status(200).send({data:clinicHistory})
        }catch(e){
            return res.status(500).send({msg: e.message})
        }
    }

    async PutClinicHistory(req,res){
        try{
            const clinicHistory = req.body;
            const {patientId} = req.params
            const modelvalidation = ClinicHistoryValidation.ModelEditValidation(clinicHistory)
            if(modelvalidation.state === true){
                return res.status(400).send({msg:modelvalidation.message})
            }
            const editClinicHistory = await ClinicHistoryRepository.EditClinicHistory(patientId, clinicHistory)
            if(editClinicHistory === null){
                return res.status(404).send({msg:'The clinic history is not added'})
            }
                
            res.status(200).send({data: editClinicHistory})
        }catch(e){
            console.log(e)
            return res.status(500).send({msg: e.message})
        }
    }
}

export default new ClinicHistoryController();