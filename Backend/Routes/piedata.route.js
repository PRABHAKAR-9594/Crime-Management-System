import { getPiedata } from "../controllers/getPiedata.controller.js"

export const getPiedataRoute =(app)=>{
    app.get('/getpiedata',getPiedata)
}