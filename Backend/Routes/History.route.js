import { history_controller } from "../controllers/History.controller.js";

export const history_route=(app)=>{
app.post('/userhistory',history_controller)
}