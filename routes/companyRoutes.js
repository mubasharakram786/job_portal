import express from 'express'
import { addJob, recruiterProfile } from '../controller/companyController.js'
import { recruiterProfileValidation } from '../validations/companyValidation.js'
import { addJobValidation } from '../validations/jobValidation.js'

const router = express.Router()

// Add Job
router.post('/add-job', addJobValidation, addJob)

// Add Recruiter
router.post('/recruiter-profile', recruiterProfileValidation, recruiterProfile)


export default router