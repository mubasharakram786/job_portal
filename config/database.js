import mongoose from 'mongoose'

const connection = async() =>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/job_portal');
    
        console.log(`Database Connect Successfully - ${conn.connections[0]._connectionString} `)
        
    } catch (error) {
        console.log(`Database connection failed - ${error.message}`)
        process.exit(1)
    }
}

export default connection