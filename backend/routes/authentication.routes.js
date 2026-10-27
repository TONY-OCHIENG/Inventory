import express from 'express'
import { authenticateUser, loginUser, logoutAdmin, registerAccount, userDetail, verifyCode } from '../controllers/authentication.controller.js'
import { access } from '../middlewares/auth.js'
import { addPurchase } from '../controllers/actions.controller.js'

const authenticationRoute = express.Router()
authenticationRoute.post("/registerAccount",registerAccount)
authenticationRoute.post("/verifyCode",verifyCode)
authenticationRoute.post("/login",loginUser)
authenticationRoute.get("/authentication",access,authenticateUser)
authenticationRoute.get("/detail/:id",userDetail)
authenticationRoute.get("/logout", logoutAdmin)
authenticationRoute.post("/addPurchase/:id",addPurchase)
export default authenticationRoute