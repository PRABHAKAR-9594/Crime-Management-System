import { Login } from "../controllers/Login.controller.js"
import { LoginMiddleware } from "../Middlewares/Login.middleware.js"
export const LoginRoute=(app)=>{
    app.post('/login',[LoginMiddleware],Login)
}