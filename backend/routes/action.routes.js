import express from 'express'
import { addReminders } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder", addReminders)
export default actionRoutes