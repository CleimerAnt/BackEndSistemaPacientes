import {PrismaClient} from '@prisma/client';
const prisma = await new PrismaClient()
class UserValidations{
    constructor(){}

    async AddValidation(user){
        const isAdded = await prisma.users.findFirst({
            where:{
                OR:[
                    {Name:user.Name},
                    {UserName:user.UserName},
                    {Email:user.Email}
                ]
            }
        })
        
        if(isAdded !== null){
            return 'The user is added'
        }

        if(typeof(user.UserName) !== 'string'){
            return 'User name must be a String'
        }
        
        if(user.Password.length < 5){
            return 'The password need more of 5 characters'
        }
        return null
    }

    async ModelValidation(User){
        const verify = "Name" in User && "LastName" in User && "Email" in User && "Password" in User && "Rol" in User
        return verify
    }
}

export default new UserValidations();