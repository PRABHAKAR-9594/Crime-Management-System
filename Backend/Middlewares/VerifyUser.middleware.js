import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { user_model } from '../models/user.model.js';
dotenv.config();
export const verify_user_logged_middleware= (req, res, next) => {
    const token = req.headers['jwt-token'];
    
    if (!token) {
        return res.status(402).send({ 'message': 'No Token Found: Unauthorized Access' });
    }

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decode) => {
        
        if (err) {
            console.log(err);
            
            return res.status(403).send({ 'message': 'Unauthorized user!' });
        }

        const user = await user_model.findOne({ username: decode.username });

        
        if (!user) {
            
            return res.status(404).send({ 'message': 'User Does Not Exist!' });
        
        } else {
            req.user = user;  // Attach the user object to the request
            next();
        }
    });
};