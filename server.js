import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import connection from './config/database.js'
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)

connection()
app.listen(9000,()=>{
    console.log("Server is Running on Port 9000")
})