import express from 'express'
import { addReminders } from '../controllers/actions.controller.js'

const actionRoutes = express.Router()
actionRoutes.post("/addReminder/:id", addReminders)
export default actionRoutes