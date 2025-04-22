import { getAllCrimeDetails } from "../controllers/crime-details-all.controller.js"

export const allCriminalDetailsRoute =(app)=>{
    app.get('/crime-details-all',getAllCrimeDetails)
}