import { missingPersonModel } from "../models/missingReg.form.model.js";
//For reporing the crime 
export const missing_reg_controller=async(req,res)=>{
try{
    const data=req.body
    const response=await missingPersonModel.create(data);
    res.status(200).send({"Message":"Reported Successfully !",response})



}
catch(err){
    res.status(400).send({"Message":"Something went wrong !",err})
    console.log(err);
    
}
}