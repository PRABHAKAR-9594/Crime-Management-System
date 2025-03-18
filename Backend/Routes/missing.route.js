import { missing_reg_controller } from "../controllers/missing.controller.js";

export const missing_route=(app)=>{
app.post('/regmissing',missing_reg_controller)
}