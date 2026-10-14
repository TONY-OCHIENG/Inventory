import express from 'express'
import { authenticateUser, loginUser, registerAccount, userDetail, verifyCode } from '../controllers/authentication.controller.js'
import { access } from '../middlewares/auth.js'

const authenticationRoute = express.Router()
authenticationRoute.post("/registerAccount",registerAccount)
authenticationRoute.post("/verifyCode",verifyCode)
authenticationRoute.post("/login",loginUser)
authenticationRoute.get("/authentication",access,authenticateUser)
authenticationRoute.get("/detail/:id",userDetail)
export default authenticationRoute