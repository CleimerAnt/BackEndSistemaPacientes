import NotificationRepository from "../Repository/NotificationRepository.js"
import NotificationValidation from "../Validations/NotificationValidation.js"

class NotificationsController{
    constructor(){

    }

    async CreateNotification(req, res){
        try{
            const notification = req.body
            const modelValidation = NotificationValidation.modelValidation(notification)
            if(modelValidation.state === true){
                return res.status(400).send({msg:modelValidation.message})
            }
            const newNotification = await NotificationRepository.Add(notification)
            return res.status(200).send(newNotification)
        }catch(e){
            return res.status(500).send({error: e})
        }
    }

    async GetByDoctorId(req, res){
        try{
            const {doctorId} = req.params
            const notification = await NotificationRepository.GetByDoctorId(doctorId)
            const validatePatientHasNotification = await NotificationValidation.validateDoctorHasNotification(doctorId)
            if(validatePatientHasNotification === true) return res.status(204).send({msg:"Notification not found"})

            return res.status(200).send(notification)
        }catch(e){
            return res.status(500).send({error: e})
        }
    }

    async GetByPatientId(req, res){
        try{
            const {patientId} = req.params
            const validatePatientHasNotification = await NotificationValidation.validatePatientHasNotification(patientId)
            if(validatePatientHasNotification === true) return res.status(204).send({msg:"Notification not found"})

            const notification = await NotificationRepository.GetByPatientId(patientId)
            return res.status(200).send(notification)
        }catch(e){
            return res.status(500).send({error: e})
        }
    }
}

export default new NotificationsController()