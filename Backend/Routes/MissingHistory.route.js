import { Missinghistory_controller } from "../controllers/MissingHistory.controller.js"

export const MissingHistory_route=(app)=>{
app.post('/dept/missinghistory',Missinghistory_controller)
}