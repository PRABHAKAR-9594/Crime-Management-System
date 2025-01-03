import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
export function connectDB() {

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection


db.on('error', () => {
        console.log("Error while connecting the database !")
    })

db.once('open', () => {
        console.log("Database connected successfully !");
    })

}





