import mongoose from "mongoose";
const criminalschema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    dob: {
        type: String,

    },
    height: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    adharnumber: {
        type: String,
        trim: true
    },
    criminalImg: {
        type: String,

    },
    desc: {
        type: String,

    },
    crimetype: {
        type: String,

    },

},{timestamps:true,versionKey:false})

export const criminalmodel=mongoose.model('Crminal',criminalschema)