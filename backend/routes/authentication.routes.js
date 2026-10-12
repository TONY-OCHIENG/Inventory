import express from 'express'
import { registerAccount } from '../controllers/authentication.controller.js'

const authenticationRoute = express.Router()
authenticationRoute.post("/registerAccount",registerAccount)
export default authenticationRoute