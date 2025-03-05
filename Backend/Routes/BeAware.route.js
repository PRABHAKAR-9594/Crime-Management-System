import { BeAwareController } from "../controllers/BeAwarePage.controller.js";

export const BeAwareRoute =(app)=>{
    app.post('/beaware',BeAwareController)
}