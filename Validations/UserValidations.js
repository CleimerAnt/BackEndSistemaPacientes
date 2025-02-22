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
        const fields = ['Name', 'LastName', 'Email', 'Password', 'Rol', 'UserName'];
        const validation = {
            state: false,
            message:''
        }

        fields.forEach(field => {
            if(field in User === false) return validation.state = true, validation.message = `The model is not completed the ${field} is missing`
        })
        return validation
    }
}

export default new UserValidations();