import { TakeCase_controller } from "../controllers/TakeCase.controller.js"
import { updateAssignedOfficer_controller } from "../controllers/TakeCase.controller.js"
export const TakeCase_route=(app)=>{
app.post('/takecasesearch',TakeCase_controller)
app.post('/updateassignofficer',updateAssignedOfficer_controller)
}