import { ProfileController } from "../controllers/Profile.controllers.js"
import { UpdateProfile } from "../controllers/Profile.controllers.js"
export const ProfileRoute=(app)=>{
app.post('/profile',ProfileController)
app.post('/updateProfile',UpdateProfile)

}