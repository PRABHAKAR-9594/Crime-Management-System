import { missing_reg_controller } from "../controllers/missing.controller.js";
import { missing_search_controller } from "../controllers/missing.controller.js";
export const missing_route=(app)=>{
app.post('/regmissing',missing_reg_controller)
app.get('/searchmissing',missing_search_controller)
}