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
import { CrimeStatus_route } from '../Routes/CrimeStatus.route.js';
import { BeAwareRoute } from '../Routes/BeAware.route.js';
import { criminal_routing } from '../Routes/criminaldata.route.js';
import { missing_route } from '../Routes/missing.route.js';
import { history_route } from '../Routes/History.route.js';
import { TakeCase_route } from '../Routes/TakeCase.route.js';
import { OpenCase_routing } from '../Routes/OpenCase.route.js';
import { DEPTHistory_route } from '../Routes/DEPTHistory.route.js';
import { verify_Mobile } from '../Routes/verifyMobile.js';
import { MissingTakeCase_route } from '../Routes/MissingTakeCase.route.js';
import { MissingOpenCase_routing } from '../Routes/MissingOpenCase.route.js';
import { MissingHistory_route } from '../Routes/MissingHistory.route.js';
import { MissingCrimeStatus_route } from '../Routes/MissingCrimeStatus.route.js';
import { allReportRoute } from '../Routes/missing-report-all.route.js';
dotenv.config();
import { allCriminalRoute } from '../Routes/criminal-record-all.route.js';
import { allCriminalDetailsRoute } from '../Routes/crime-details-all.route.js';
import { allUsersRoute } from '../Routes/users-all.route.js';
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
CrimeStatus_route(app)
BeAwareRoute(app)
criminal_routing(app)
missing_route(app)
history_route(app)
TakeCase_route(app)
OpenCase_routing(app)
DEPTHistory_route(app)
verify_Mobile(app)
MissingTakeCase_route(app)
MissingOpenCase_routing(app)
MissingHistory_route(app)
MissingCrimeStatus_route(app)
allReportRoute(app)
allCriminalRoute(app)
allCriminalDetailsRoute(app)
allUsersRoute(app)
app.listen(process.env.PORT,()=>{
console.log(`Server is running on http://localhost:${process.env.PORT} `);

})