import { OfficerModel } from "../models/officerReg.model.js"
export const officer_controller=async(req,res)=>{
     try{
            const data=req.body
           const UserData=await OfficerModel.create(data)
            res.status(200).send({message:'Officer Created !',UserData})
    
        }
        catch(error){
            res.status(400).send({message:'Something went wrong while Registring the officer ',error})
        }
    
}