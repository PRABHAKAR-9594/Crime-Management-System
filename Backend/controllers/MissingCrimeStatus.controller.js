
import { missingPersonModel } from "../models/missingReg.form.model.js";

export const MissingCrimeStatus_controller =  async(req,res)=>{
    const AcknowledgeNumber=req.body.AcknowledgeNumber
    if(!AcknowledgeNumber){
        return res.status(404).send({message:'Plese Enter AcknowledgeNumber'})
    }
try{
const response=await missingPersonModel.findOne({acknowledgeNumber:AcknowledgeNumber})
if (response) {
  res.status(200).send(response)  
}
else{
    res.status(404).send({"message":"Plese enter Valid AcknowledgeNumber !"})
}
}
catch(error){
    res.status(404).send({"message":'Something went wrong In Crime Status Page',error})
}

}