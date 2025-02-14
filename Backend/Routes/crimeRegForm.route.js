import { crimeRegFormController } from "../controllers/crimeRegForm.controller.js";
import { CrimeRegistrationMiddleware } from "../Middlewares/CrimeRegForm.middleware.js";
import { verify_user_logged_middleware } from "../Middlewares/VerifyUser.middleware.js"
export const crimeRegFormRoute=(app)=>{
    app.post('/CrimeRegForm',CrimeRegistrationMiddleware,[verify_user_logged_middleware],crimeRegFormController)
}