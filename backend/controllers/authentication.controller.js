import { comparepassword, hashPassword } from "../configs/hashPassword.js"
import { generateVerificationCode } from "../configs/verificationCode.js"
import databaseconnection from "../database/db.js"
import { verificationCodeEmail } from "../mail/mail.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const registerAccount = async (request,response) => {
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
    const verificationTokenExpires = new Date(Date.now() + 5 * 60 * 1000)

    try {
        const checkEmail = "SELECT email FROM users WHERE email = ?"
        databaseconnection.query(checkEmail, [email], (error,results) => {
            if (error) return response.status(200).json({success: false, message: error})
            if (results.length > 0) {
                return response.status(200).json({success: false, message: "Account already exists"})
            } else {
                const registerAccount = "INSERT INTO users (firstName,lastName,email,password,verificationToken,verificationTokenExpires) VALUES(?,?,?,?,?,?)"
                databaseconnection.query(registerAccount,[firstName,lastName,email,hashpassword,verificationToken,verificationTokenExpires],
                    (error, result) => {
                        if (error) return response.status(500).json({success: false, message: error})
                        if (result) {
                            verificationCodeEmail(email,verificationToken)
                            return response.status(201).json({success: true, message: "Account created successfully"})
                        }
                    }
                )

            }
        })
     
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: 'Internal server error'})
    }
}

export const verifyCode = (request,response) => {
    const { code } = request.body
    if (!code) {
        return response.status(200).json({success: false, message: "Enter a valid code"})
    }
    
    try {
        const getCode = "SELECT verificationToken , verificationTokenExpires from users WHERE verificationToken  = ?"
        databaseconnection.query(getCode, [code], (error,result) => {
            if (error) return response.status(200).json({success: false, message: error})
            if (result.length > 0) {
                const currentTime = new Date()
                const tokenExpireTime = new Date(result[0].verificationTokenExpires)
                
                if (currentTime > tokenExpireTime) {
                    return response.status(200).json({success: false, message:"Token expired"})
                } else {
                    const updateVerification = "UPDATE users SET isVerified = TRUE WHERE verificationToken = ?"
                    databaseconnection.query(updateVerification,[code], (error, results) => {
                        if (error) return response.status(500).json({success: false, message: error})
                        return response.status(200).json({success: true, message:"Email verified successfully"})
                    })
                }
            } else {
                return response.status(200).json({success: false, message: "Invalid code"})
            }
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const loginUser = (request,response) => {
    const { email, password } = request.body

    if (!email || !password) {
        return response.status(200).json({success: false, message:"Fill all fields"})
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!regex.test(email)) {
        return response.status(200).json({
            success: false,
            message:"Enter a valid email"
        })
    }

    try {
        const checkuser = "SELECT * FROM users WHERE email = ?"
        databaseconnection.query(checkuser,[email],(error, results) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (results.length > 0) {
                const pass = results[0].password
                const hpassword = comparepassword(password,pass)
                if (hpassword) {
                    const user_id = results[0].user_id
                    const access_token = jwt.sign({user_id},process.env.ACCESS_TOKEN,{expiresIn:'1m'}) 
                    const refresh_token = jwt.sign({user_id},process.env.ACCESS_TOKEN,{expiresIn:'7d'})

                    // Assigning cookies
                      response.cookie("refresh",refresh_token,({
                        httpOnly: true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }))

                    //storing access token in http only cookie

                    response.cookie("access",access_token,({
                        httpOnly: true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 1 * 60 * 1000
                    })) 
                    return response.status(200).json({success: true, message:"login successfully"})
                } else {
                    return response.status(200).json({success: false, message:"wrong credentials"})
                }
            }
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message:"Internal server error"})        
    }
}

export const refreshToken = (request,response) => {
    const token = request.cookies.refresh
    let exist = false;
    if (!token) {
           return response.status(200).json({success: false, message:"Unauthorised access"})
    } else {
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded) => {
            if (err) { 
                return response.status(200).json({success:false, message:"Access denied"})
            } else {
                const access_token = jwt.sign({user_id: decoded.user_id},process.env.ACCESS_TOKEN,{expiresIn:'5m'})
                response.cookie("access",access_token,({
                        httpOnly: true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 1 * 60 * 1000
                }))
                exist = true                 
            }
        })
    }

    return exist; 
}