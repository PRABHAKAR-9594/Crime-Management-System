import { user_model } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// For Login Logic
export const Login = async (req, res) => {
    try {
        // Fetching username and password entered by user
        const { username, passwordHash: userEnteredPass } = req.body;

        // Fetching the user details from the database
        const user = await user_model.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "Invalid Username!" });
        }

        // Validating the password
        const isValidPass = await bcrypt.compare(userEnteredPass, user.passwordHash);
        if (!isValidPass) {
            return res.status(403).send({ message: "Invalid Password!" });
        }

        // Generating the token
        const token = jwt.sign(
            { username: user.username, role: user.role },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn:process.env.JWT_TOKEN_EXPIRY}
        );

        res.status(200).send({
            message: "Login Successful!",
            AccessToken: token,
            Name: user.firstName,
            Role: user.role,
            Email:user.email,
            Pincode:user.address.postalCode,

        });
    } catch (error) {
        console.error("Login Error:", error); // Logs the error for debugging
        res.status(500).send({ message: "Something went wrong while logging the user" });
    }
};
