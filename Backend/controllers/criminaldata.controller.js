import { criminalmodel } from "../models/criminal.model.js";


// For creating the criminal records 

export const createcriminalcontroller=async(req,res)=>{
try{
    const data =req.body;
    const response=await criminalmodel.create(data)
    res.status(200).send({message:'Data Submitted ! ',response})
}
catch(error){
    console.log(error);
    
    res.status(400).send({message:'Something went wrong while submitting the criminal record',error})
}
}

// For fatching the criminal records !


export const findcriminalcontroller=async(req,res)=>{
    try{
        const data =req.body.adharnumber;
        const records=await criminalmodel.find({adharnumber:data})
        if (records.length === 0) {
            return res.status(200).send({ message: "No records found!", records: [] });
        }

        res.status(200).send({ message: "Records found", records });
    }
    catch(error){
        console.log(error);
        
        res.status(400).send({message:'Something went wrong while finding  the criminal record',error})
    }
    }