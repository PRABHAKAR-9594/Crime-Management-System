import { crimeRegFormController } from "../controllers/crimeRegForm.controller.js";
import { CrimeRegistrationMiddleware } from "../Middlewares/CrimeRegForm.middleware.js";
export const crimeRegFormRoute=(app)=>{
    app.post('/CrimeRegForm',CrimeRegistrationMiddleware,crimeRegFormController)
}