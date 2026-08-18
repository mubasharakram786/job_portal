import './config/env.js'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import connection from './config/database.js'
import { Server } from 'socket.io'
import http from 'http'
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
         origin:'http://localhost:3020',
         credentials:true
    }
}) 
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(cors({
//     origin:'http://localhost:3020'
// }))



app.use('/api/auth', userRoutes)
app.use('/api', profileRoutes)
app.use('/api', companyRoutes)


io.on('connection', (socket)=>{
    console.log("User connect", socket.id)
})

io.on('disconnect', ()=>{
    console.log("User disconnected", socket.id)
})

connection()
server.listen(process.env.PORT || 9001,()=>{
    console.log("Server is Running on Port 9000")
})