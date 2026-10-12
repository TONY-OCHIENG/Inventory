import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { VERIFICATION_CODE } from "./mailTemplates";
dotenv.config()

export const verificationCodeEmail = async (email,verificationCode) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const message = {
            to: email,
            subject: "Verification code",
            html: VERIFICATION_CODE.replace("{verification_code}",verificationCode)
        };
        const info = await transporter.sendMail(message);
        console.log("Message sent", info.messageId);
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}