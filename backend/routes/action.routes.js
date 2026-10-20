import express from 'express'
import { addReminders, getReminders } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
export default actionRoutes