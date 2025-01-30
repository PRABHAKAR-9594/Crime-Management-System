import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true                                
    },
    email: {
        type: String,
        trim: true   
    
    },
    passwordHash: {
        type: String,
        trim: true                 
    },
    role: {
        type: String,
        enum: ['user', 'admin','department'],                  
        default: 'user'
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
       
    },
    AdharNumber:{
        type:String,
        trim: true
    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        country: {
            type: String,
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    
},{timestamps:true,versionKey:false});


export const user_model = mongoose.model('User', userSchema);

