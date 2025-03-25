import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dob: { type: Date, required: true },
    aadhar: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Theft', 'Murder','Cyber','Missing'], required: true }
}, { timestamps: true, versionKey: false });

export const OfficerModel= mongoose.model("Officer ", userSchema);
