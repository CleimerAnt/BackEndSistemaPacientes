import PatientsRepository from "../Repository/PatientsRepository.js"

class PatientsController{
    constructor(){}

    async Register(req, res){
        const patient = req.body
        try{
            const newPatient = await PatientsRepository.Add(patient)
            res.status(201).send(newPatient)
        }catch(e){
            res.status(500).send({msg: e.message})
        }
    }
}

export default new PatientsController()