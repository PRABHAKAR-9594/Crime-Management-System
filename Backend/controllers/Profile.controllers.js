import { user_model } from "../models/user.model.js";


 export const ProfileController = async(req,res)=>{
    try{
        const {username}  =req.body
            const  response = await user_model.findOne({username})
            if (response) {
                res.status(200).send({response})
            }
            else{
                res.status(400).send({message:'User Not Found !'})
            }
         

    }





catch(error){
    res.status(400).send({message:'Something went Wrong in Proile !'})
    console.log(error);
    
}
}



// For Updating Profile in the Db


export const UpdateProfile = async(req,res)=>{
try{
const Udata =req.body
const Username=req.body.username

const UpdatedData=await user_model.updateOne({username:Username},{$set:{...Udata}})
if(UpdatedData.modifiedCount >=1){
    res.status(200).send({"Message":"Data Updated succcessfully ",UpdatedData})
}
else{
    res.status(404).send({"Message":` ${Username}  Not Found `})
}

    
}
catch(error){
    res.send(404).send({"Message":"Something went wrong while updating the data ..."})
}




}