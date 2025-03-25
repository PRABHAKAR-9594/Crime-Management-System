import { officer_controller } from "../controllers/officer.controller.js";

export const officer_route=(app)=>{
app.post('/createofficer',officer_controller)

}