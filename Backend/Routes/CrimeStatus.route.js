import { CrimeStatus_controller } from "../controllers/CrimeStatus.controller.js";
export const CrimeStatus_route=(app)=>{
app.post('/CrimeStatus',CrimeStatus_controller)
}