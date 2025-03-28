import { missingPersonModel } from "../models/missingReg.form.model.js";
//For reporing the crime 
export const missing_reg_controller=async(req,res)=>{
try{
    const data=req.body
    console.log("today", data);
    const response=await missingPersonModel.create(data);
    res.status(200).send({"Message":"Reported Successfully !",response})



}
catch(err){
    res.status(400).send({"Message":"Something went wrong !",err})
    console.log(err);
    
}
}

// For Searching the missing 

export const missing_search_controller = async (req, res) => {
    try {
      const { name, pincode, days } = req.query;
      let filter = {};
  
      if (name) {
        filter["missingPerson.fullName"] = { $regex: new RegExp(name, "i") };
      }
  
      if (pincode) {
        filter["lastSeenDetails.pincode"] = pincode;
      }
  
      if (days) {
        const dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - parseInt(days));
        filter["lastSeenDetails.date"] = { $gte: new Date(dateLimit) }; // Ensure it's a Date type
      }
  
      console.log("Applied Filter:", filter);
  
      const response = await missingPersonModel.find(filter);
  
      res.status(200).send({ Message: "Data Fetched Successfully!", response });
    } catch (err) {
      res.status(400).send({ Message: "Something went wrong!", err });
      console.log(err);
    }
  };
  