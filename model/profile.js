import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    nationality: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    headline: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    professionalSummary: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 255,
      trim: true,
    },

   resume: {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      publicId: {
        type: String,
        required: true,
      },
      originalName: {
        type: String,
        required: true,
      },
    },

    expectedSalary: {
      type: Number,
      min: 0,
    },

    socialLinks: {
      github: String,
      linkedin: String,
      portfolio: String,
      website: String,
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    experience: [
      {
        company: {
          type: String,
          required: true,
          trim: true,
        },
        position: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],

    education: [
      {
        institute: {
          type: String,
          required: true,
          trim: true,
        },
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        field: {
          type: String,
          required: true,
          trim: true,
        },
        startYear: Number,
        endYear: Number,
        grade: String,
      },
    ],

    certifications: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        organization: {
          type: String,
          required: true,
          trim: true,
        },
        issueDate: Date,
        certificateUrl: String,
      },
    ],

    languages: [
      {
        language: {
          type: String,
          trim: true,
        },
        level: {
          type: String,
          enum: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Native",
          ],
        },
      },
    ],

    projects: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        technologies: {
          type: [String],
          default: [],
        },
        github: String,
        liveDemo: String,
      },
    ],

    jobPreferences: {
      type: [
        {
          type: String,
          enum: [
            "Full Time",
            "Part Time",
            "Internship",
            "Contract",
            "Remote",
            "Hybrid",
          ],
        },
      ],
      default: [],
    },

    currentCompany: {
      type: String,
      trim: true,
    },

    currentPosition: {
      type: String,
      trim: true,
    },

    availability: {
      type: String,
      enum: ["Immediate", "15 Days", "30 Days", "60 Days"],
      default: "Immediate",
    },

    openToWork: {
      type: Boolean,
      default: true,
    },

    visibility: {
      type: String,
      enum: ["Public", "Private", "Employers Only"],
      default: "Public",
    },

    verification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;