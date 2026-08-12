import express from 'express'
import { addJob, fetchAllJobs, fetchSingleJob, getAllJobs, getCompanyProfile, recruiterProfile,fetchApplicants } from '../controller/companyController.js'
import { recruiterProfileValidation } from '../validations/companyValidation.js'
import { addJobValidation } from '../validations/jobValidation.js'
import { auth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Add Job
router.post('/add-job',auth, addJob)

// Fetch All Jobs
router.get('/all-jobs' , auth,  getAllJobs)

// Add Recruiter
router.post('/recruiter-profile',auth, recruiterProfile)

// Get Recruiter Profile
router.get('/get-company', auth ,  getCompanyProfile)

// Get All Jobs (Public)
router.get('/public-jobs' , fetchAllJobs)

// Get Single Job Details
router.get('/public-jobs/:slug' , fetchSingleJob)

// view Applicants
router.get('/applicants-list' , auth , fetchApplicants)

export default router