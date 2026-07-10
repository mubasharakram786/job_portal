import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    resetToken:String,
    resetTokenExpiration:Date,
        isVerified: {
        type: Boolean,
        default: false
    },
    role:{
        type:String,
        enum:['candidate', 'recruiter'],

    },
     verificationToken: String,
  verificationTokenExpires: Date
},{timestamps:true})

const userModal = mongoose.model('User', userSchema)

export default userModal

