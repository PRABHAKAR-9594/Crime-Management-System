import { user_model } from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const verifyMobile = async (req, res) => {
    try {
        const { phone, email } = req.body; 
        console.log("Phone number:", phone);
        console.log("Email:", email);
        // Check if mobile number and email exist in the database
        const user = await user_model.findOne({ phone , email });

        if (user) {
            res.status(200).send({
                success: true,
                message: "Mobile number and email verified"
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Mobile number or email not found"
            });
        }
    } catch (error) {
        console.error("Error verifying mobile number and email", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while verifying the mobile number and email"
        });
    }
};

export const newPassword = async (req, res) => {
    try {
        const { phone, email, newPassword } = req.body; 

        // Check if mobile number and email exist in the database
        const user = await user_model.findOne({ phone :phone, email });
        
        if (user) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 8); // 10 rounds for better security
            
            // Update the password in the database
            const result = await user_model.updateOne(
                { phone, email }, // Filter based on both fields
                { $set: { passwordHash: hashedPassword } } // Update operation
            );

            if (result.modifiedCount > 0) {
                res.status(200).send({
                    success: true,
                    message: "Password updated successfully"
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: "Password update failed"
                });
            }
        } else {
            res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error updating password", error);
        res.status(500).send({
            success: false,
            message: "An error occurred while updating the password"
        });
    }
};
