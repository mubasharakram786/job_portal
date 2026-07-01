import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'



function generateToken(id){
   return jwt.sign({id:id}, 'Job_portal' , {expiresIn:'1h'})
}

export const signUpUser = async(req,res,next)=>{
   const {name,email,password} = req.body;
        
   try {
        const isExist = await User.findOne({email});
        if(isExist){
           return res.status(409).json({message: 'User already exists.'})
        }
        const genSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,genSalt)
        const user = new User({name:name,email:email,password:hashPassword});
        await user.save()
        return res.status(201).json({message:"User has been registered successfully!", user:user})
   } catch (error) {
       return res.status(500).json({message:error.message})
   }


}


export const loginUser = async(req,res,next) =>{
    const {email,password} = req.body

        try {
            const user = await User.findOne({email});
            if(user){
                const matchPassword = await bcrypt.compare(password , user.password);
                if(!matchPassword){
                   return res.status(401).json({message:"Password doesn't matched"})
                }

                let token = generateToken(user._id);
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
            html:`http://localhost:3000/${token}`
         })

         return res.status(200).json({message:"Password eset Link has been sent at your email successfully!"})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}