import bcrypt from 'bcrypt'
import { user_model } from '../models/user.model.js'

export const userReg = async (req, res) => {

//It is optional 
//why we need this 
// if you want to modify your schema and you modified it but the changes will be not reflected without this or you had to manually drop the entire collection 
    // await user_model.syncIndexes();



    // Here we encrypting our password 
    const Encpass=await bcrypt.hash(req.body.passwordHash,8)
    const userReg = new user_model({
        ...req.body,
        passwordHash:Encpass


    });

    try {
        const user_create = await user_model.create(userReg)
        const Response = {
            name: user_create.name,
            role: user_create.role
        }
        res.status(201).send({ message: 'User created successfully' , Response})
    }
    catch (error) {

        res.status(400).send({ message: 'Error While regestering the user !' , error})



    }




}