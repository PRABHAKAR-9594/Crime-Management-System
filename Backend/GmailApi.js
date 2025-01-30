import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config()
export const gmail_api=(to,subject,text)=>{
const gmailauth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: process.env.Gmailuser,
            pass: process.env.Gmailpass

        }
    });

    const receiver = {
        from : 'CMS',
        to : to,
        subject :subject,
        text : text
    };

    gmailauth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
}