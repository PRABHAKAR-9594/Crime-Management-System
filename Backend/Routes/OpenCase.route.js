import { OpenCaseDetails_controller } from "../controllers/OpenCase.controller.js"
import { OpenCaseCloseTicket_controller } from "../controllers/OpenCase.controller.js"
export const OpenCase_routing=(app)=>{
app.post('/dept/opencase',OpenCaseDetails_controller)
app.post('/dept/closecase',OpenCaseCloseTicket_controller)

}