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
        ref:'Job',
        required:true
    },
        status: {
        type: String,
        enum: [
            "applied",
            "reviewing",
            "shortlisted",
            "interview",
            "rejected",
            "hired",
            "withdrawn"
        ],
        default: "applied"
        },
    resume:{
        url:String,
        publicId:String
    },
    appliedDate:{
        type:Date,
        default: Date.now
    }
},{
    timestamps:true
})

jobApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true })
jobApplicationSchema.index({ jobId: 1, status: 1 })

const JobApplication = mongoose.model('jobApplication', jobApplicationSchema)
export default JobApplication