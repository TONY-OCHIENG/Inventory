import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const databaseconnection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

databaseconnection.getConnection((err, connection) => {
    if (err) {
        console.log("Error in connecting database")
        console.log(err)
    } else {
        console.log("Database connected")
        connection.release()
    }
})

export default databaseconnection