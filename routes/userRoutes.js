import express from 'express'
import { loginUser, signUpUser } from '../controller/userControllers.js'

const router = express.Router()

// Sign up User
router.post('/sign-up' , signUpUser)

// Login User
router.post('/login', loginUser)

export default router