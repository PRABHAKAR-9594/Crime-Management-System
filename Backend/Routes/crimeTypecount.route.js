import { getcrimeTypeCount } from "../controllers/getcrimeTypeCount.controller.js"

export const getcrimeTypeCountRoute =(app)=>{
    app.get('/getcrimeTypeCount',getcrimeTypeCount)
}