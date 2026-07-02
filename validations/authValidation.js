import {body} from 'express-validator'
import User from '../model/user.js'

export const registerValidation =[
        body('email').notEmpty().withMessage('Email is Required.').isEmail().withMessage('Please enter a valid email address').custom(async(email)=>{
                     const isExist = await User.findOne({email});
                    if(isExist){
                      throw new Error('Email already exists.')
                    }
        }),
        body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long.')
    ]

export const loginValidation = [
    body('email').notEmpty().withMessage('Email is Required.').isEmail().withMessage('Please enter a valid email address'),
    body('password').not().isEmpty().withMessage('Password is required.'),

]

export const passwordValidation = [
    body('password').notEmpty().withMessage('Password is Required.').isLength({min:8}).withMessage('Password must be at least 8 characters long.'),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
           }
    return true;
    })
]