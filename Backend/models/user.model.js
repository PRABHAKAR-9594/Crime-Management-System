import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], // Mandatory with custom error message                           // Unique constraint
        trim: true                                // Removes leading/trailing spaces
    },
    email: {
        type: String,
        required: [true, 'Email is required'],    // Mandatory with custom error message
    
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required']  // Mandatory
    },
    role: {
        type: String,
        required: [true, 'Role is required'],     // Mandatory
        enum: ['user', 'admin','department'],                  // Acceptable values
        default: 'user'
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'] // Mandatory
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']  // Mandatory
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'], // Mandatory
       
    },
    AdharNumber:{
        type:String,
        required:[true,'Adhar number is required']
    },
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'] // Mandatory
        },
        city: {
            type: String,
            required: [true, 'City is required']         // Mandatory
        },
        state: {
            type: String,
            required: [true, 'State is required']        // Mandatory
        },
        postalCode: {
            type: String,
            required: [true, 'Postal code is required'], // Mandatory
        },
        country: {
            type: String,
            required: [true, 'Country is required']      // Mandatory
        }
    },
    isActive: {
        type: Boolean,
        required: [true, 'Active status is required'], // Mandatory
        default: true
    },
    
},{timestamps:true,versionKey:false});


export const user_model = mongoose.model('User', userSchema);

