import { ProfileController } from "../controllers/Profile.controllers.js"
import { UpdateProfile } from "../controllers/Profile.controllers.js"
import { verify_user_logged_middleware } from "../Middlewares/VerifyUser.middleware.js"
export const ProfileRoute=(app)=>{
app.post('/profile',ProfileController)
app.post('/updateProfile',[verify_user_logged_middleware],UpdateProfile)

}