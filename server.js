import './config/env.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import connection from './config/database.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:3020',
    credentials:true
}))
app.use(cookieParser())

app.use('/api/auth', userRoutes)
app.use('/api', profileRoutes)
app.use('/api', companyRoutes)


connection()
app.listen(process.env.PORT || 9001,()=>{
    console.log("Server is Running on Port 9000")
})