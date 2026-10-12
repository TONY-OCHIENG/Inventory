import express from 'express'
import { registerAccount, verifyCode } from '../controllers/authentication.controller.js'

const authenticationRoute = express.Router()
authenticationRoute.post("/registerAccount",registerAccount)
authenticationRoute.post("/verifyCode",verifyCode)
export default authenticationRoute