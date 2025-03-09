import { createcriminalcontroller } from "../controllers/criminaldata.controller.js"
import { findcriminalcontroller } from "../controllers/criminaldata.controller.js"
export const criminal_routing=(app)=>{
app.post('/searchcriminal',findcriminalcontroller)
app.post('/createcriminal',createcriminalcontroller)
}