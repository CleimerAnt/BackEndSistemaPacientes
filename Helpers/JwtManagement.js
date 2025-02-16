import JWT from 'jsonwebtoken'

class JwtManagement{
    constructor(){}

    Verify(token, res){
        try{
            if(!token){
                return res.status(401).send({msg:"No token provided"})
            }

            const data = JWT.verify(token, process.env.SECRET_JWTKEY)
            return data;
        }catch(e){
            return res.status(401).send({msg:'Invalid token'})
        }
    }

    Create(loginUser){
        const token = JWT.sign(loginUser, process.env.SECRET_JWTKEY, {
            expiresIn: '1h'
        })

        return token;
    }
}

export default new JwtManagement();