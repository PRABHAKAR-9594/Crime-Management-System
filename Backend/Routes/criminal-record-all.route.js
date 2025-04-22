import { getAllCriminalRecords } from "../controllers/criminal-record-all.controller.js"

export const allCriminalRoute =(app)=>{
    app.get('/criminal-records-all',getAllCriminalRecords)
}

