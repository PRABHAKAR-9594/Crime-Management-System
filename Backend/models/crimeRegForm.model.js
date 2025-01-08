import mongoose from 'mongoose'

const crimeRegFormSchema = new mongoose.Schema({
    username: {
        type: String,                           
        trim: true                                
    },
    crimetype: {
        type: String,                          
        trim: true                                
    },
    description: {
        type: String,                          
        trim: true
    },
    incidentDate: {
        type: String,                          
        trim: true
    },
    incidentTime: {
        type: String,                          
        trim: true
    },
    incidentLocation:{
        address:{
            type: String,                          
            trim: true
        },
    city:{
        type: String,                          
        trim: true
    },
    state:{
        type: String,                         
        trim: true
    },
    pincode:{
        type: String,                          
        trim: true
    }
    },
evidence:{
 imageFile:{
    type: String,                          
    trim: true
},
videoFile:{
    type: String,                          
    trim: true
}
},
suspectDetails:{
  name:{
    type: String,                          
    trim: true
},
description:{
    type: String,                          
    trim: true
}
},
acknowledgeNumber:{
    
        type: String,                          
        trim: true
    
},
status:{
    type: String,                         
    trim: true,
    enum: ['Open', 'Under investigation','Closed'],
},
assignedOfficer:{
    UserName:
        {
            type: String,                         
            trim: true
        },
  Name:{
        type: String,                          
        trim: true
    },
    contact:{
        type: String,                          
        trim: true
    },
    
    
    
}
}, { timestamps: true, versionKey: false })

export const crimeRegFormModel=mongoose.model('crimeRegForm',crimeRegFormSchema)