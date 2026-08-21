import Company from "../model/company.js";
import Job from "../model/job.js"
import { validationResult } from "express-validator";
import JobApplication from "../model/jobApplication.js";
import { getIO } from "../config/socket.js";
import { populate } from "dotenv";

export const addJob = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }


const postedBy = req.userId

const company = await Company.findOne({userId:postedBy})

if(!company){
    return res.status(404).json({message:"Company not found."})
}
const createSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
// const slug = createSlug(req.body.title)
try {
    const job = new Job({
        postedBy,
        companyId:company._id,
      ...req.body
})
job.slug = `${createSlug(job.title)}-${job._id.toString().slice(-6)}`;   
await job.save()
return res.status(201).json({message:"New Job Created Successfully"})
} catch (error) {
    return res.status(400).json({message:error})
}

}
export const getAllJobs = async(req,res,next)=>{
    const userId = req.userId
    try {
        const jobs = await Job.find({postedBy:userId});
        return res.status(200).json({message:"Fetch All Jobs Successfully", jobs})
    } catch (error) {
        return res.status(404).json({message:""})
    }
}
export const fetchAllJobs = async(req,res,next)=>{
    try {
        const jobs = await Job.find();
        return res.status(200).json({message:"Fetch All Jobs Successfully", jobs})
    } catch (error) {
        return res.status(404).json({message:""})
    }
}
export const recruiterProfile = async(req,res,next)=>{

const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
}


const userId = req.userId;


 try {


        const company = new Company( {userId, ...req.body})

  await company.save()
  return res.status(201).json({message:"Company & Recruiter Profile Created Successfully"})
 } catch (error) {
    return res.status(400).json({message:error})
 }

}
export const fetchSingleJob = async(req,res,next)=>{
    const {slug} = req.params
    
    try {
        const job = await Job.findOne({slug})
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        return res.status(200).json({message:"Job fetch successfully", job})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const getCompanyProfile = async(req,res,next)=>{
    const userId = req.userId
    const company = await Company.findOne({userId})

    if(!company){
        return res.status(404).json({message:"Company not found"})
    }

    return res.status(200).json({message:"Company profile fetch successfully!", company})
}


export const fetchApplicants = async(req,res,next)=>{
    const applicants = await JobApplication.find().populate('profileId');

    if(!applicants){
        return res.status(404).json({message:"No applicants found!"})
    }

    return res.status(200).json({message:"Applicants fetch successfully", applicants})
}


export const fetchJobApplicants = async(req,res,next)=>{

    const {jobId} = req.query

    const jobApplicants = await JobApplication.find({jobId}).populate('profileId')

    if(!jobApplicants){
         return res.status(404).json({message:"No applicants found related to this job"})
    }

    return res.status(200).json({message:"Applicants fetch successfully", jobApplicants})


}

const APPLICATION_STATUSES = [
    "applied",
    "reviewing",
    "shortlisted",
    "interview",
    "rejected",
    "hired",
    "withdrawn"
]

export const updateJobStatus = async(req,res,next)=>{
    const { applicationId, status } = req.body
    if(!applicationId || !status){
        return res.status(400).json({message:"applicationId and status are required"})
    }

    if(!APPLICATION_STATUSES.includes(status)){
        return res.status(400).json({message:"Invalid status value"})
    }

    try {
        const application = await JobApplication.findById(applicationId).populate('jobId')
        if(!application){
            return res.status(404).json({message:"Application not found"})
        }

        if(application.jobId?.postedBy?.toString() !== req.userId){
            return res.status(403).json({message:"You are not authorized to update this application"})
        }

        application.status = status       
        await application.save()
        
    
        const io = getIO()

        const applicantUserId = application.userId?._id ?? application.userId

        io.to(`user:${applicantUserId}`).emit('applicationStatusUpdated', {
            applicationId:application._id,
            jobId:application.jobId._id,
            status:application.status,
            message: `Your application status has been updated to ${status}`,
        })

        return res.status(200).json({message:"Application status updated successfully", application})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}