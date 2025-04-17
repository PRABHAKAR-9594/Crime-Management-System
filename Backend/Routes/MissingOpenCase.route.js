

import { MissingOpenCaseDetails_controller } from "../controllers/MissingOpenCase.controller.js"
import { MissingOpenCaseCloseTicket_controller } from "../controllers/MissingOpenCase.controller.js"

export const MissingOpenCase_routing=(app)=>{
app.post('/dept/missingopencase',MissingOpenCaseDetails_controller)
app.post('/dept/misssingclosecase',MissingOpenCaseCloseTicket_controller)

}