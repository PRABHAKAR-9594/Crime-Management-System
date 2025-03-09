import { crimeRegFormModel } from "../models/crimeRegForm.model.js";

export const  crimeRegFormController= async(req,res)=>{

    try{
        const data=req.body
       const FormData=await crimeRegFormModel.create(data)
        res.status(200).send({message:'Form Submitted ',FormData})

    }
    catch(error){
        res.status(400).send({message:'Something went wrong while submitting the Crime form',error})
    }


}