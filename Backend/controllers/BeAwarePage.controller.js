import { crimeRegFormModel } from "../models/crimeRegForm.model.js";


export  const BeAwareController=async(req,res)=>{

const pincode=req.body.pincode;

    try{
        const records=await crimeRegFormModel.find({"incidentLocation.pincode":pincode})
       
        if (records.length === 0) {
            return res.status(200).send({ message: "No records found!", records: [] });
        }

        res.status(200).send({ message: "Records found", records });

    }
    catch(error){
        console.log(error);
        
        res.status(404).send({"Message":"Something went wrong !",error})
    }
}