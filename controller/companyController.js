import Company from "../model/company.js";
import Job from "../model/job.js"
import { validationResult } from "express-validator";

export const addJob = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }


const postedBy = req.userId

try {
    const job = new Job({
        postedBy,
      ...req.body
})
    
await job.save()
return res.status(201).json({message:"New Job Created Successfully"})
} catch (error) {
    return res.status(400).json({message:error})
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
