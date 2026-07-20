import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    companyLogo:{
        type:String,
        default:""
    },
    companyBanner:{
        type:String,
        default:""
    },
    industry:{
        type:String,
        required:true,
          trim:true
    },
    establishedYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
      companySize: {
      type: String,
      enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
    },
    website:{
        type:String,
        default:""
    },
     email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
     phone: {
      type: String,
      default: "",
    },
     country: {
      type: String,
      required: true,
    },
   state: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },
     about: {
      type: String,
      maxlength: 2000,
      default: "",
    },
     // Recruiter Information

         recruiterName: {
      type: String,
      required: true,
      trim: true,
    },
        designation: {
      type: String,
      default: "Recruiter",
    },
        recruiterEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
      recruiterPhone: {
      type: String,
      default: "",
    },
       socialLinks: {
      linkedin: String,
      facebook: String,
      twitter: String,
      instagram: String,
    },
     // Company Status
      status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
      // Statistics
       totalJobsPosted: {
      type: Number,
      default: 0,
    },
     totalFollowers: {
      type: Number,
      default: 0,
    },
},
  {
    timestamps: true,
  }
)
export default mongoose.model("Company", companySchema);