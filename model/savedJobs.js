import mongoose from 'mongoose'


const savedJobsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    jobs:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:'jobs',}
    ]
})

const savedJobs = mongoose.model('savedJobs', savedJobsSchema)

export default savedJobs