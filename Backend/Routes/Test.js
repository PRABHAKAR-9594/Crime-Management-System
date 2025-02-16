import { TestCont } from "../controllers/Test.js";

export const TestRoute=(app)=>{
    app.post('/Test',TestCont)
}
