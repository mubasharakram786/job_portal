import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    companyId: {  
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workMode: {
        type: String,
        enum: ['remote', 'on-site', 'hybrid'],
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
    },
    
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    vacancies: {
        type: Number,
        required: true,
    },
    benefits: {
        type: String,
        required: true,
    },
    applyLastDate: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isUrgent: {
        type: Boolean,
        default: false,
    },
    slug: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


