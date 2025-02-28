import MedicalAppointmentRepository from "../Repository/MedicalAppointmentRepository.js"
import MedicalAppointmentsValidation from "../Validations/MedicalAppointmentsValidation.js";

class MedicalAppointmentController{
    constructor () {}

    async Post(req, res){
        try{
            const medicalAppointment = req.body;
            const modelValidation = MedicalAppointmentsValidation.modelValidation(medicalAppointment)
            if(modelValidation.state === true){
                return res.status(400).send({msg: modelValidation.message})
            }
            const newMedicalAppointment = await MedicalAppointmentRepository.Add(medicalAppointment)
            return res.status(201).send({data: newMedicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetAllMedicalAppointments(req,res){
        try{
            const medicalAppointment = await MedicalAppointmentRepository.GetAllMedicalAppointments();
            if(medicalAppointment.length === 0) return res.status(204).send({msg: 'Not found Medical Appointments'})
            res.status(200).send({data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetByPatientAndDoctor(req,res){
        try{
            const {PatientId, DoctorId} = req.params;
            const medicalAppointment = await MedicalAppointmentRepository.GetMedicalAppointmentByPatientIdAndDoctorId(PatientId, DoctorId)
            if(medicalAppointment.length === 0) return res.status(204).send({msg: 'Not found Medical Appointments'})
            res.status(200).send({data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async GetByDoctorId(req,res){
        try{
            const {DoctorId} = req.params;
            const medicalAppointment = await MedicalAppointmentRepository.GetMedicalAppointmentByDoctorId(DoctorId)
            if(medicalAppointment.length === 0) return res.status(204).send({msg: 'Not found Medical Appointments'})
            res.status(200).send({data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async ReprogrammingMedicalAppointment(req, res){
        try{
            const {Id} = req.params;
            const {DateTime} = req.body;
            const addedValidation = await MedicalAppointmentsValidation.isAdded(Id)
            if(addedValidation === false){
                return res.status(204).send({msg:'Medical Appointment not found'})
            }
            const medicalAppointment = await MedicalAppointmentRepository.ReprogrammingMedicalAppointment(Id, DateTime)
            res.status(200).send({data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async DeleteMedicalAppointment(req, res){
        try{
            const {Id} = req.params;
            const addedValidation = await MedicalAppointmentsValidation.isAdded(Id)
            if(addedValidation === false){
                return res.status(204).send({msg:'Medical Appointment not found'})
            }
            const medicalAppointment = await MedicalAppointmentRepository.Delete(Id)
            res.status(200).send({msg: 'Deleted successfully', data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }

    async DeleteMedicalAppointmentsForPatient(req, res){
        try{
            const {patientId} = req.params;
            const addedValidation = await MedicalAppointmentsValidation.isAddedMedicalAppointmentForPatient(patientId)
            if(addedValidation === false){
                return res.status(204).send({msg:'Medical Appointment not found'})
            }
            const medicalAppointment = await MedicalAppointmentRepository.DeleteAllMedicalAppointmentsOfPatient(patientId)
            res.status(200).send({msg: 'Deleted successfully', data: medicalAppointment})
        }catch(e){
            return res.status(500).send({msg:e.message})
        }
    }
}

export default new MedicalAppointmentController();