import express from 'express'
import { createProfile } from '../controller/profileControllers.js'
import { auth } from '../middleware/authMiddle.js'

const router = express.Router()



router.post('/create-profile' , auth,  createProfile)


export default router