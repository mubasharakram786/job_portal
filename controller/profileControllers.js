import Profile from '../model/profile.js'


export const createProfile = async(req,res,next)=>{
const {
  firstName,
  lastName,
  profilePic,
  phoneNumber,
  dateOfBirth,
  gender,
  nationality,
  city,
  country,
  address,
  headline,
  professionalSummary,
  resume,
  expectedSalary,
  socialLinks,
  skills,
  experience,
  education,
  certifications,
  languages,
  projects,
  jobPreferences,
  currentCompany,
  currentPosition,
  availability,
  openToWork,
  visibility,
  verification,
} = req.body;

    try {
        const profile = new Profile({user:req.userId,firstName,
  lastName,
  profilePic,
  phoneNumber,
  dateOfBirth,
  gender,
  nationality,
  city,
  country,
  address,
  headline,
  professionalSummary,
  resume,
  expectedSalary,
  socialLinks,
  skills,
  experience,
  education,
  certifications,
  languages,
  projects,
  jobPreferences,
  currentCompany,
  currentPosition,
  availability,
  openToWork,
  visibility,
  verification})
        
          await profile.save();
          return res.status(201).json({message:"Profile has been created successfully!"})
    } catch (error) {
        return res.status(500).json({message:error.message || "Something went wrong"})
    }
}