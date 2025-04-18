import { MissingCrimeStatus_controller } from "../controllers/MissingCrimeStatus.controller.js"
export const MissingCrimeStatus_route=(app)=>{
app.post('/missingstatus',MissingCrimeStatus_controller)
}