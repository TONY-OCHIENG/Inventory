import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { refreshToken } from '../controllers/authentication.controller.js'

dotenv.config()


export const access = async (request,response,next) => {
    const token = request.cookies.access
    if (!token) {
        const refreshed = await refreshToken(request, response) // must NOT send a response itself
        if (!refreshed) {
            return response.status(401).json({ success: false, message: "unauthorised access" })
        }
        return next()
     } else {
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded) => {
            if (err) {
                return response.status(200).json({success:false, message:"Access denied"})
            } else {
                request.user_id = decoded.user_id
                next()
            }
        })
    }
}