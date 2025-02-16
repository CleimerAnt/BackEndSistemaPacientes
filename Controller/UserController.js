import UserRepository from "../Repository/UserRepository.js";
import UserValidations from "../Validations/UserValidations.js";
import JwtManagement from "../Helpers/JwtManagement.js";

class UserController{
    constructor(){}

    async Add(req, res){
        const user = req.body;
        try{
            const validation = await UserValidations.AddValidation(user)
            const modelValidation = await UserValidations.ModelValidation(user)
            if(!modelValidation){
                return res.status(400).send({msg:"The model is not completed"})
            }
            if(validation){
                return  res.status(400).json({msg:validation})
            }
            const newUser = await UserRepository.Add(user)
            res.status(201).json({user:newUser})
        }catch(err){
            res.status(500).send(err.message)
        }
    }

    async Login(req,res){
        const {UserName,Password,Email} = req.body;
        try{
            const loginUser = await UserRepository.Login(UserName,Password,Email);
            if(typeof(loginUser) === 'string'){
                return res.status(400).send({msg:loginUser})
            }
            if(loginUser === null){
                return res.status(404).send({msg:'User not found'})
            }
            const token = JwtManagement.Create(loginUser)
            res.cookie('accessToken', token, {
                httpOnly:true,
                sameSite: 'Lax',
                secure:false,
                maxAge: 1000 * 60 * 60
            })
            res.status(200).send(loginUser)
        }catch(err){
            res.status(500).send(err.message)
        }
    }

}

export default new UserController();