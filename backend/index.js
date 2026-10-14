import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import databaseconnection from './database/db.js'
import authenticationRoute from './routes/authentication.routes.js'

dotenv.config()


const app = express()

//Implementing express middlewares

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["POST","PUT","DELETE","GET"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.static('backend/public'))
app.use("/api/v1",authenticationRoute)

app.listen(process.env.PORT, () => {
    databaseconnection
    console.log("server is running")
})