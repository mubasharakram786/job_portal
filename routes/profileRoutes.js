import express from 'express'
import { createProfile, uploadResume,uploadProfilePic,applyJobApplication,getCandidateProfile,updateProfile,candidateProfile,jobStatus,appliedJobs } from '../controller/profileControllers.js'
import { auth } from '../middleware/authMiddleware.js'
import {imageUpload, resumeUpload} from '../middleware/upload.js'
import { createProfileValidation } from '../validations/profileValidation.js'

const router = express.Router()



router.post('/candidate-profile' , auth ,   createProfile)

router.put('/update-candidate/:id' , auth ,   updateProfile)

router.get('/get-candidate' , auth , getCandidateProfile)

router.post('/upload-resume', auth , resumeUpload.single('resume') , uploadResume  )

router.post('/upload-profile-pic', auth , imageUpload.single('profilePic'), uploadProfilePic)

router.post('/apply-job', auth , applyJobApplication)

// public profile
router.get('/candidate/:id' , candidateProfile)

// check job Status
router.get('/job-status', auth , jobStatus)

// Applied Jobs
router.get('/applied-jobs', auth , appliedJobs)

export default router