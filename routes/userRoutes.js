import express from 'express'
import { forgotPassword, loginUser, signUpUser } from '../controller/userControllers.js'

const router = express.Router()

// Sign up User
router.post('/sign-up' , signUpUser)

// Login User
router.post('/login', loginUser)

// Forgot Password
router.post('/forgot-password', forgotPassword)

export default router