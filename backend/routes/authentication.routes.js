import express from 'express'
import { loginUser, registerAccount, verifyCode } from '../controllers/authentication.controller.js'

const authenticationRoute = express.Router()
authenticationRoute.post("/registerAccount",registerAccount)
authenticationRoute.post("/verifyCode",verifyCode)
authenticationRoute.post("/login",loginUser)
export default authenticationRoute