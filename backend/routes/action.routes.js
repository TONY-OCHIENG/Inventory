import express from 'express'
import { addProducts, addReminders, deleteReminders, getProducts, getReminders } from '../controllers/actions.controller.js'
import { upload } from '../configs/upload.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
actionRoutes.delete("/deleteReminder/:id",deleteReminders)
actionRoutes.post("/addProducts/:id",upload.single('image'), addProducts)
actionRoutes.get("/products/:id",getProducts)
export default actionRoutes