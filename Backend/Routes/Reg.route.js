import { userReg } from "../controllers/reg.controller.js";
import { verify_reg,uniqueUsername,uniqueAdhar,uniqueEmail } from "../Middlewares/reg.middleware.js";

export const Reg_route=(app)=>{
    app.post('/register',[verify_reg,uniqueUsername,uniqueAdhar,uniqueEmail],userReg)
}