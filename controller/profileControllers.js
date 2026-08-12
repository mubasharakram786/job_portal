import Profile from '../model/profile.js'
import { validationResult } from 'express-validator'
import { uploadToCloudinary } from '../services/cloudinary.service.js'
import JobApplication from '../model/jobApplication.js'
export const createProfile = async(req,res,next)=>{
const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }


    try {
        const profile = new Profile({user:req.userId,...req.body})
        
          await profile.save();
          return res.status(201).json({message:"Profile has been created successfully!"})
    } catch (error) {
        return res.status(500).json({message:error.message || "Something went wrong"})
    }
}

export const uploadResume = async(req,res,next)=>{
    try {
        const file = req.file;
        const uploaded = await uploadToCloudinary(file,'resume','raw');
        return res.status(200).json({message:"Resume Uploaded Successfully!", url:uploaded.url , publicId:uploaded.public_id, originalName:file.originalname})
    } catch (error) {
        return res.status(400).json({message:"Something went wrong!"})
    }

}

export const uploadProfilePic = async(req,res,next)=>{
     
        const file = req.file;
        const uploaded = await uploadToCloudinary(file,'profile','image');
        return res.status(200).json({message:"Profile Picture Uploaded Successfully!", url:uploaded.url})
 
}

export const applyJobApplication = async(req,res,next)=>{
    const userId = req.userId
    
    const profile = await Profile.findOne({user:userId})
    if(!profile){
        return res.status(404).json({message:"profile_id is not found."})
    }

    try {
        const jobApplication = new JobApplication({userId:userId, profileId:profile._id, ...req.body})

        await jobApplication.save()

        return res.status(201).json({message:"Job application submitted successfully", jobApplication})
        
    } catch (error) {
        return res.status(500).json({message: error || "Something went wrong"})
    }
}

export const getCandidateProfile = async(req,res,next)=>{
    const user = req.userId;

    const candidate = await Profile.findOne({user});


    if(!candidate){
        return res.status(404).json({message:"Candidate not found"})
    }

    return res.status(200).json({message:"Fetch candidate profile successfully", candidate})
}

export const updateProfile = async(req,res,next)=>{
    const {id:_id} = req.params
    try {
        const updateProfile = await Profile.findByIdAndUpdate(_id , req.body, {new:true})
        if(!updateProfile){
            return res.status(400).json({message:"Unable to update the profile"})
        }
        return res.status(200).json({message:"Profile updated successfully"})
    } catch (error) {
         return res.status(500).json({message:"Something went wrong"})
    }
}

export const candidateProfile = async(req,res,next)=>{
    const {id} = req.params

    const candidate = await Profile.findById(id);

    if(!candidate){
        return res.status(404).json({message:"Candidate not found"})
    }

    return res.status(200).json({message:"Fetch candidate profile successfully", candidate})
}