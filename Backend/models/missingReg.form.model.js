import mongoose from "mongoose";

const MissingPersonSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    missingPerson: {
        fullName: { type: String, required: true },
        age: { type: Number, required: true },
        photo: { type: String },
        contact: { type: String, required: true },
    },
    lastSeenDetails: {
        location: { type: String, required: true },
        pincode: { type: String, required: true },
        date: { type: Date, required: true },
    },
    status:{
        type: String,                         
        trim: true,
        enum: ['Open', 'Under investigation','Closed'],
    },
    acknowledgeNumber:{
    
        type: String,                          
        trim: true
    
},
    assignedOfficer: {
        UserName:
        {
            type: String,
            trim: true
        },
        Name: {
            type: String,
         
        },
        contact: {
            type: String,
            trim: true
        },
    }
}, { timestamps: true, versionKey: false });

export const missingPersonModel= mongoose.model("MissingPerson", MissingPersonSchema);
