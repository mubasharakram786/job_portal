import express from 'express'

import { forgotPassword, loginUser,  resendVerification, resetPassword, signUpUser, verifyUser } from '../controller/userControllers.js'
import {body} from 'express-validator'
import { loginValidation, passwordValidation } from '../validations/authValidation.js'
const router = express.Router()

// Sign up User
router.post('/register',   signUpUser)

// Verify User
router.post('/verify-account' , verifyUser )

// Login User
router.post('/login', loginValidation ,loginUser)

// Forgot Password
router.post('/forgot-password', forgotPassword)

// Reset Password
router.post('/reset-password', passwordValidation , resetPassword)

// resend verification
router.post('/resend-verification' , resendVerification)

// Logout
// router.post('/logout', logout)

export default router