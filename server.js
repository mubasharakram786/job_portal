import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import connection from './config/database.js'
const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(cors({
//     origin:'http://localhost:5000'
// }))
app.use(cookieParser())

app.use('/api', userRoutes)
app.use('/api', profileRoutes)


connection()
app.listen(9000,()=>{
    console.log("Server is Running on Port 9000")
})