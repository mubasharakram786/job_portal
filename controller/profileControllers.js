import Profile from '../model/profile.js'
import { validationResult } from 'express-validator'
import { uploadToCloudinary } from '../services/cloudinary.service.js'

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
        const uploaded = await uploadToCloudinary(file,'resume');
        return res.status(200).json({message:"Resume Uploaded Successfully!", url:uploaded.url , publicId:uploaded.public_id, originalName:uploaded.original_filename})
    } catch (error) {
        return res.status(400).json({message:"Something went wrong!"})
    }

}

export const uploadProfilePic = async(req,res,next)=>{
     
        const file = req.file;
        const uploaded = await uploadToCloudinary(file,'profile');
        return res.status(200).json({message:"Profile Picture Uploaded Successfully!", url:uploaded.url})
 
}