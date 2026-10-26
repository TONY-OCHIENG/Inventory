import express from 'express'
import { addProducts, addReminders, availableStock, deleteProduct, deleteReminders, depletedStock, getProducts, getReminders, lowStock } from '../controllers/actions.controller.js'
import { upload } from '../configs/upload.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
actionRoutes.get("/reminders/:id",getReminders)
actionRoutes.delete("/deleteReminder/:id",deleteReminders)
actionRoutes.post("/addProducts/:id",upload.single('image'), addProducts)
actionRoutes.get("/products/:id",getProducts)
actionRoutes.delete("/deleteProduct/:id",deleteProduct)
actionRoutes.get("/availableStock/:id",availableStock)
actionRoutes.get("/lowStock/:id",lowStock)
actionRoutes.get("/depletedStock/:id",depletedStock)
export default actionRoutes