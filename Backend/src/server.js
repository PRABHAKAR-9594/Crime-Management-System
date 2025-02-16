import express from 'express';
import cors from 'cors';
import {connectDB}  from './db/index.js';
import dotenv from 'dotenv';
import { Reg_route } from '../Routes/Reg.route.js';
import { LoginRoute } from '../Routes/Login.route.js';
import { crimeRegFormRoute } from '../Routes/crimeRegForm.route.js';
import { GmailApi_Route } from '../Routes/Gmail.route.js';
import { ProfileRoute } from '../Routes/Profile.route.js';
import { TestRoute } from '../Routes/Test.js';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json())

//For Starting the Db server 
connectDB()

//Passing the parameter to the Routes 
LoginRoute(app)
Reg_route(app)
crimeRegFormRoute(app)
GmailApi_Route(app)
ProfileRoute(app)
TestRoute(app)





app.listen(process.env.PORT,()=>{
console.log(`Server is running on http://localhost:${process.env.PORT} `);

})