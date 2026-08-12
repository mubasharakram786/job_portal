import express from 'express'
import { createProfile, uploadResume,uploadProfilePic } from '../controller/profileControllers.js'
import { auth } from '../middleware/authMiddleware.js'
import {imageUpload, resumeUpload} from '../middleware/upload.js'
import { createProfileValidation } from '../validations/profileValidation.js'

const router = express.Router()



router.post('/candidate-profile' , auth ,   createProfile)

router.post('/upload-resume', auth , resumeUpload.single('resume') , uploadResume  )

router.post('/upload-profile-pic', auth , imageUpload.single('profilePic'), uploadProfilePic)


export default router