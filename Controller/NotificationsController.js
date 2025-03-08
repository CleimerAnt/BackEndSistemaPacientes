import NotificationRepository from "../Repository/NotificationRepository.js"

class NotificationsController{
    constructor(){

    }

    async CreateNotification(req, res){
        try{
            const notification = req.body
            const newNotification = await NotificationRepository.Add(notification)
            return res.status(200).send(newNotification)
        }catch(e){
            return res.status(500).send({error: e})
        }
    }
}

export default new NotificationsController()