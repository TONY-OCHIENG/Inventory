import express from 'express'
import { addReminders, deleteReminders, getReminders } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
actionRoutes.delete("/deleteReminder/:id",deleteReminders)
export default actionRoutes