import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()


const app = express()

//Implementing express middlewares

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log("server is running")
})