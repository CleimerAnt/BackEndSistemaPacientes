import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

class NotificationsRepository{
    constructor(){

    }

    async Add(notification){
        const Notification = await prisma.notifications.create({
            data: {...notification}
        })

        return Notification;
    }
}

export default new NotificationsRepository()