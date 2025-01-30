import { GmailApi_controller } from "../controllers/Gmail.controller.js"

export const GmailApi_Route=(app)=>{
app.post('/sendGmail',GmailApi_controller)
}