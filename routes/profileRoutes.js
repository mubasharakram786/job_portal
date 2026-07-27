import express from 'express'
import { createProfile } from '../controller/profileControllers.js'
import { auth } from '../middleware/authMiddleware.js'
import upload from '../middleware/upload.js'
import { createProfileValidation } from '../validations/profileValidation.js'

const router = express.Router()



router.post('/create-profile' , auth , upload.single('resume'), createProfileValidation, createProfile)


export default router