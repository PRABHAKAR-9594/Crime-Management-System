export const LoginMiddleware=(req,res,next)=>{
    try{
if(!req.body.username){
    return res.status(400).send({message:'Please Enter the username !'})
}
if(!req.body.passwordHash){
    return res.status(400).send({message:'Please Enter the Password !'})
}

next()
    }
    catch (error) {
        return res.status(500).send({
            message: 'An unexpected error occurred during validation',
            error: error.message
        });
    }

}