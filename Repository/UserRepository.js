import {PrismaClient} from '@prisma/client';
import 'dotenv/config.js'
import {randomUUID} from 'crypto';
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();

class UserRepository{
    constructor(){}
    
    async Add(user) {
        user.Id = randomUUID();
        user.Password = await bcrypt.hash(user.Password,parseInt(process.env.SORT_ROUNDS))
        const newUser = await prisma.users.create({
            data:{...user}
        })
        return {
            Name:newUser.Name,
            LastName:newUser.LastName,
            UserName:newUser.UserName,
            Email:newUser.Email,
            Rol:newUser.Rol
        };
    }  

    async Login(UserName,Password,Email){
        const findUser = await prisma.users.findFirst({
            where:{
                OR:[
                    {UserName},
                    {Email}
                ]
            }
        })
        if(findUser === null){
            return null;
        }
        const isValid = await bcrypt.compare(Password, findUser.Password);
        if(!isValid){
            return 'Password is incorred'
        }else{
            return {
                Name:findUser.Name,
                Email:findUser.Email,
                Username:findUser.UserName,
                LastName:findUser.LastName,
                Rol:findUser.Rol,
                Id:findUser.Id
            }
        }
    }
    
    async findUserById(id){
        const user = await prisma.users.findFirst({
            where:{
                Id:id
            }
        })

        if(user === null){
            throw new Error('The user is not added')
        }
        
        return {
            'Id':user.Id,
            'Name': user.Name,
            'LastName':user.LastName,
            'Email':user.Email,
            'Rol':user.Rol
        }
    }
}

export default new UserRepository();