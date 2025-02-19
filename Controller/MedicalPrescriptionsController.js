import MedicalPrescriptionsValidation from '../Validations/MedicalPrescriptionsValidation.js'
import MedicalPrescriptionsRepository from '../Repository/MedicalPrescriptionsRepository.js';

class MedicalPrescriptionController{
    constructor () {}

    async Post(req, res){
        try{
            const MedicalPrescription = req.body;
            const modelValidation = MedicalPrescriptionsValidation.modelValidation(MedicalPrescription)
            if(modelValidation.state === true){
                return res.status(400).send({msg: modelValidation.message})
            }
            const newMedicalPrescription = await MedicalPrescriptionsRepository.Add(MedicalPrescription)
            return res.status(201).send({data: newMedicalPrescription})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetAllMedicalPrescriptions(req,res){
        try{
            const MedicalPrescriptions = await MedicalPrescriptionsRepository.GetAllMedicalPrescriptions()
            if(MedicalPrescriptions.length === 0) return res.status(204).send({msg: 'Not found Medical Prescriptions'})
            res.status(200).send({data: MedicalPrescriptions})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetMedicalPrescriptionByPatientId(req,res){
        try{
            const {patientId} = req.body
            const MedicalPrescriptions = await MedicalPrescriptionsRepository.GetAllMedicalPrescriptionsByPatientId(patientId)
            if(MedicalPrescriptions.length === 0) return res.status(204).send({msg: 'Not found Medical Prescriptions'})
            res.status(200).send({data: MedicalPrescriptions})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetByPatientAndDoctor(req,res){
        try{
            const {PatientId, DoctorId} = req.params;
            const MedicalPrescriptions = await MedicalPrescriptionsRepository.GetMedicalPrescriptionsByPatientIdAndDoctorId(PatientId, DoctorId)
            if(MedicalPrescriptions.length === 0) return res.status(204).send({msg: 'Not found Medical Prescriptions'})
            res.status(200).send({data: MedicalPrescriptions})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async DeleteMedicalPrescriptions(req, res){
        try{
            const {patientId} = req.params;
            const addedValidation = await MedicalPrescriptionsValidation.isAdded(patientId)
            if(addedValidation === false){
                return res.status(204).send({msg:'Medical Prescriptions not found'})
            }
            const MedicalPrescriptions = await MedicalPrescriptionsRepository.Delete(patientId)
            res.status(200).send({msg: 'Deleted successfully', data: MedicalPrescriptions})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async PutMedicalPrescriptions(req, res){
        try{
            const {patientId} = req.params;
            const MedicalPrescription = req.body;
            const modelValidation = MedicalPrescriptionsValidation.EditmodelValidation(MedicalPrescription)
            if(modelValidation.state === true){
                return res.status(400).send({msg: modelValidation.message})
            }
            const addedValidation = await MedicalPrescriptionsValidation.isAdded(patientId)
            if(addedValidation === false){
                return res.status(204).send({msg:'Medical Prescriptions not found'})
            }
            const newMedicalPrescriptions = await MedicalPrescriptionsRepository.UpdateMedicalPrescriptions(patientId, MedicalPrescription)
            res.status(200).send({data: newMedicalPrescriptions})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }
}

export default new MedicalPrescriptionController();