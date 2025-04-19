import { getAllMissingReports } from "../controllers/missing-report-all.controller.js"

export const allReportRoute =(app)=>{
    app.get('/missing-report-all',getAllMissingReports)
}