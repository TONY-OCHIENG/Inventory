import express from 'express'
import { addProducts, addReminders, deleteReminders, getReminders } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
actionRoutes.delete("/deleteReminder/:id",deleteReminders)
actionRoutes.post("/addProducts",addProducts)
export default actionRoutes