import express from 'express'
import { addJob, getAllJobs, recruiterProfile } from '../controller/companyController.js'
import { recruiterProfileValidation } from '../validations/companyValidation.js'
import { addJobValidation } from '../validations/jobValidation.js'
import { auth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Add Job
router.post('/add-job',auth,  addJobValidation, addJob)

// Fetch All Jobs
router.get('/all-jobs' , auth,  getAllJobs)

// Add Recruiter
router.post('/recruiter-profile',auth, recruiterProfileValidation, recruiterProfile)


export default router