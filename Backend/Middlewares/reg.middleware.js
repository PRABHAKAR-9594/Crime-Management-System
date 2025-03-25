import { user_model } from "../models/user.model.js";

// For all basic field middleware 

export const verify_reg = (req, res, next) => {

    try {
        // Convert email to uppercase if provided
    
        if (req.body.email) {
            req.body.email = req.body.email.toUpperCase();
        }

        // Validate name
        if (!req.body.username) {
            return res.status(400).send({
                message: 'Failed! Username was not provided in request body'
            });
        }

        // Validate email
        if (!req.body.email) {
            return res.status(400).send({
                message: 'Failed! Email was not provided in request body'
            });
        }

        // Validate password
        if (!req.body.passwordHash) {
            return res.status(400).send({
                message: 'Failed! Password was not provided in request body'
            });
        }

        // Validate role
      

        // Validate personal details
        if (!req.body.firstName) {
            return res.status(400).send({
                message: 'Failed! First name was not provided in request body'
            });
        }

        if (!req.body.lastName) {
            return res.status(400).send({
                message: 'Failed! Last name was not provided in request body'
            });
        }

        if (!req.body.phone) {
            return res.status(400).send({
                message: 'Failed! Phone number was not provided in request body'
            });
        }

        let AdharNumber=req.body.AdharNumber
        if (AdharNumber.length !=12) {
           return res.status(400).send({message:'Adhar Number Must be 12 Digits !'})
            
        }


        if (!req.body.AdharNumber) {
            return res.status(400).send({
                message: 'Failed! Adhar number was not provided in request body'
            });
        }

        // Validate address fields
        if (!req.body.address || !req.body.address.street) {
            return res.status(400).send({
                message: 'Failed! Street address was not provided in request body'
            });
        }

        if (!req.body.address.city) {
            return res.status(400).send({
                message: 'Failed! City was not provided in request body'
            });
        }

        if (!req.body.address.state) {
            return res.status(400).send({
                message: 'Failed! State was not provided in request body'
            });
        }

        if (!req.body.address.postalCode) {
            return res.status(400).send({
                message: 'Failed! Postal code was not provided in request body'
            });
        }

        if (!req.body.address.country) {
            return res.status(400).send({
                message: 'Failed! Country was not provided in request body'
            });
        }

        // Check for active status (optional)
        if (req.body.isActive !== undefined && typeof req.body.isActive !== 'boolean') {
            return res.status(400).send({
                message: 'Failed! Active status must be a boolean value'
            });
        }

        // If all checks pass, move to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).send({
            message: 'An unexpected error occurred during validation',
            error: error.message
        });
    }
};



// For unique username 

export const uniqueUsername = async (req, res, next) => {
    try {

        const username = await user_model.findOne({ username: req.body.username })

        if (username) {
            res.status(400).send({ message: 'Username are already in use !' })

        }
        else {
            next()
        }


    }
    catch (error) {
        res.status(400).send({ message: 'Something went wrong while validating the username', error })

    }

}

// For Unique AdharNumber 

export const uniqueAdhar = async (req, res, next) => {
    try {

        const adharNum = await user_model.findOne({ AdharNumber: req.body.AdharNumber })
       
        
        if (adharNum) {
            res.status(400).send({ message: 'Adhar Number already in use !' })
        }
        else {
            next()
        }

    }
    catch(error){
        res.status(400).send({ message: 'Something went wrong while validating the Adhar Number', error })

    }
}

//For unique Gmail

export const uniqueEmail = async (req, res, next) => {
    try {

        const Email = await user_model.findOne({ email: req.body.email })

        if (Email) {
            res.status(400).send({ message: 'Email are already in use !' })

        }
        else {
            next()
        }


    }
    catch (error) {
        res.status(400).send({ message: 'Something went wrong while validating the Email', error })

    }

}




