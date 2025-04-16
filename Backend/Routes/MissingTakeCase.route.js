import { MissingTakeCase_controller } from "../controllers/MissingTakeCase.controllers.js"
import { MissingupdateAssignedOfficer_controller } from "../controllers/MissingTakeCase.controllers.js"

export const MissingTakeCase_route=(app)=>{
app.post('/missingtakecasesearch',MissingTakeCase_controller)
app.post('/missingupdateassignofficer',MissingupdateAssignedOfficer_controller)
}