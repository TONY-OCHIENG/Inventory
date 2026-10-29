import express from 'express'
import { addProducts, addPurchase, addReminders, availableStock, cancelPurchase, deleteProduct, deletePurchase, deleteReminders, depletedStock, getProducts, getPurchase, getReminders, lowStock, pendingPurchase, recievePurchase } from '../controllers/actions.controller.js'
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
actionRoutes.post("/addPurchase/:id",upload.single('productImage'),addPurchase)
actionRoutes.get("/getPurchase/:id",getPurchase)
actionRoutes.put("/cancelPurchase/:id",cancelPurchase)
actionRoutes.put("/recievePurchase/:id",recievePurchase)
actionRoutes.delete("/deletepurchase/:id",deletePurchase)
actionRoutes.get("/pendingPurchase/:id",pendingPurchase)
actionRoutes.get("/recievedPurchase/:id",recievePurchase)
export default actionRoutes