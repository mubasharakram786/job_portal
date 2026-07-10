import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { validationResult } from 'express-validator'



function generateToken(id){
   return jwt.sign({id:id}, 'Job_portal' , {expiresIn:'1h'})
}

export const signUpUser = async(req,res,next)=>{
   const {name,email,password,role} = req.body;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
   try {
        const token = crypto.randomBytes(32).toString('hex')
        const genSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,genSalt)
        const user = new User({name:name,email:email,password:hashPassword,role:role, verificationToken:token , verificationTokenExpires:Date.now() + 900000});
        await user.save()
         const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
})
               transporter.verify((error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("SMTP Ready");
                }
            });
         await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:'Verify Account',
            html:`<p>Thank you for signing up!</p>
                <p>Please click the button below to verify your email address:</p>

                <a href=http://localhost/verify-email/${token}
                style="
                    background:#2563eb;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;
                    display:inline-block;
                ">
                Verify Email
                </a>

                <p>This link will expire in <strong>15 minutes</strong>.</p>

                <p>If you did not create this account, you can safely ignore this email.</p>

                <p>Best regards,<br>Your Company Name</p>`
         })
        return res.status(201).json({message:"User has been registered successfully!", user:user._id})
   } catch (error) {
       return res.status(500).json({message:error.message})
   }
}

export const verifyUser = async(req,res,next)=>{
    const {token} = req.body;
    try {
        const user = await User.findOne({verificationToken:token ,verificationTokenExpires:{$gt: Date.now()} });
        if(!user){
            return res.status(400).json({message:"Token is expired or invalid"})
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        await user.save()
        return res.status(200).json({message:"Email verified successfully!"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const loginUser = async(req,res,next) =>{
    const {email,password} = req.body
       const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
        try {
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message:"User not found."})
            }
            if(!user.isVerified){
                return res.status(400).json({message:"Email is not verified"})
            }
            if(user){
                const matchPassword = await bcrypt.compare(password , user.password);
                if(!matchPassword){
                   return res.status(401).json({message:"Password doesn't matched"})
                }

                let token = generateToken(user._id);
                res.cookie('token', token ,{
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
                })
                return res.status(200).json({message:'User has logged in successfully', token:token})

            }else{
                return res.status(404).json({message:"User not found."})
            }

        } catch (error) {
            return res.status(500).json({message:error.message})
        }

}

export const forgotPassword = async(req,res,next)=>{
    const {email} = req.body
    const token = crypto.randomBytes(32).toString('hex');
    try {
         const user = await User.findOne({email});
         if(!user){
            return res.status(401).json({message:"Couldn't find any account related to this eamil id"})
         }
         user.resetToken = token;
         user.resetTokenExpiration = Date.now() + 900000;
         await user.save()
         const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS
                }
})
         transporter.verify((error, success) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("SMTP Ready");
                }
            });
         await transporter.sendMail({
            from:'mubashar1418@gmail.com',
            to:user.email,
            subject:'Reset Password Link',
            html:`Here is your reset  Link <a href=http://localhost:3000/${token}>http://localhost:3000/${token}</a> click here to reset your password`
         })

         return res.status(200).json({message:"Password Reset Link has been sent at your email address successfully!"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const resetPassword = async(req,res,next)=>{
    const {password,token} = req.body 
           const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    try {
        const user = await User.findOne({resetToken:token , resetTokenExpiration:{$gt:Date.now()}})
        if(!user){
            return res.status(401).json({message:"Token Expired or doesn't Matched"})
        }
              const isSamePassword = await bcrypt.compare(password,user.password);
        if(isSamePassword){
            return res.status(400).json({message:"New password must be different from current password"})
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, genSalt)
        user.password = hashPassword
        user.resetToken = undefined
        user.resetTokenExpiration = undefined
        await user.save()
        return res.status(200).json({message:"Password has been updated successfully!"})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const logout = async(req,res,next) =>{
    try {
        res.clearCookie('token' , {
             httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({message:"User have been logout successfully"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}