import User from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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