import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import databaseconnection from './database/db.js'

dotenv.config()


const app = express()

//Implementing express middlewares

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    databaseconnection
    console.log("server is running")
})