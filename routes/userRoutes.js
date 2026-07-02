import express from 'express'

import { forgotPassword, loginUser, logout, resetPassword, signUpUser } from '../controller/userControllers.js'
import {body} from 'express-validator'
import { loginValidation, passwordValidation, registerValidation } from '../validations/authValidation.js'
const router = express.Router()

// Sign up User
router.post('/sign-up', registerValidation,  signUpUser)

// Login User
router.post('/login', loginValidation ,loginUser)

// Forgot Password
router.post('/forgot-password', forgotPassword)

// Reset Password
router.post('/reset-password', passwordValidation , resetPassword)

// Logout
router.post('/logout', logout)

export default router