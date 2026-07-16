import mongoose from 'mongoose'

const jobApplicationSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    profileId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'jobs',
        required:true
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','accepted','rejected']
    }
},{
    timestamps:true
})

const jobApplication = mongoose.model('jobApplication', jobApplicationSchema)
export default jobApplication