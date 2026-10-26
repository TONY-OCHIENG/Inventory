import express from 'express'
import { addProducts, addReminders, availableStock, deleteProduct, deleteReminders, getProducts, getReminders, lowStock } from '../controllers/actions.controller.js'
import { upload } from '../configs/upload.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
actionRoutes.delete("/deleteReminder/:id",deleteReminders)
actionRoutes.post("/addProducts/:id",upload.single('image'), addProducts)
actionRoutes.get("/products/:id",getProducts)
actionRoutes.delete("/deleteProduct/:id",deleteProduct)
actionRoutes.get("/availbleStock/:id",availableStock)
actionRoutes.get("/lowStock/:id",lowStock)
export default actionRoutes