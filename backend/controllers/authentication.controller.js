import { hashPassword } from "../configs/hashPassword.js"
import { generateVerificationCode } from "../configs/verificationCode.js"

export const registerAccount = (request,response) => {
    const { firstName, lastName, email, password,confirmPassword} = request.body

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    if ( password !== confirmPassword) {
        return response.status(200).json({success: false, message: "Password mismatch"})
    }

    if (firstName.length > 20) {
        return response.status(200).json({success: false, message: "Name cannot be greater than 20 characters long"})
    }

    if (lastName.length > 20) {
        return response.status(200).json({success: false, message: "Name cannot be greater than 20 characters long"})
    }

    if (password.length < 8) {
        return response.status(200).json({success: false, message:"Password must be at least eight characters long"})
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!regex.test(email)) {
        return response.status(200).json({
            success: false,
            message:"Enter a valid email"
        })
    }

    const hashpassword = hashPassword(password)
    /**
     * Generating a verification code that will be sent to user's email
     * Setting the verification code to expire after 5 minutes
     */
    const verificationToken = generateVerificationCode()
    const verificationTokenExpires = Date.now() + 5 * 60 * 1000


} 