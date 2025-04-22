import { getAllUsers } from "../controllers/users-all.controller.js"

export const allUsersRoute =(app)=>{
    app.get('/users-all',getAllUsers)
}