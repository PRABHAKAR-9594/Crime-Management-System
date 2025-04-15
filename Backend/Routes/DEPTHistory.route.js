import { DEPThistory_controller } from "../controllers/DEPTHistory.controller.js"

export const DEPTHistory_route=(app)=>{
app.post('/dept/history',DEPThistory_controller)
}