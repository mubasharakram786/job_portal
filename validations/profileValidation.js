import { body } from "express-validator";

export const createProfileValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("lastName").trim().notEmpty().withMessage("Last name is required."),

  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required."),

  body("dateOfBirth")
    .notEmpty().withMessage("Date of birth is required.")
    .isISO8601().withMessage("Date of birth must be a valid date.")
    .toDate(),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"]).withMessage("Gender must be Male, Female or Other."),

  body("nationality").trim().notEmpty().withMessage("Nationality is required."),

  body("city").trim().notEmpty().withMessage("City is required."),

  body("country").trim().notEmpty().withMessage("Country is required."),

  body("address").trim().notEmpty().withMessage("Address is required."),

  body("headline")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Headline must not exceed 100 characters."),

  body("professionalSummary")
    .trim()
    .notEmpty().withMessage("Professional summary is required.")
    .isLength({ min: 50, max: 255 }).withMessage("Professional summary must be between 50 and 255 characters."),

  body("resume.url").trim().notEmpty().withMessage("Resume url is required."),
  body("resume.publicId").trim().notEmpty().withMessage("Resume publicId is required."),
  body("resume.originalName").trim().notEmpty().withMessage("Resume original name is required."),

  body("expectedSalary")
    .optional()
    .isFloat({ min: 0 }).withMessage("Expected salary must be a positive number."),

  body("socialLinks.github").optional().trim().isURL().withMessage("Github link must be a valid URL."),
  body("socialLinks.linkedin").optional().trim().isURL().withMessage("LinkedIn link must be a valid URL."),
  body("socialLinks.portfolio").optional().trim().isURL().withMessage("Portfolio link must be a valid URL."),
  body("socialLinks.website").optional().trim().isURL().withMessage("Website link must be a valid URL."),

  body("skills")
    .isArray({ min: 1 }).withMessage("At least one skill is required."),
  body("skills.*").trim().notEmpty().withMessage("Skill cannot be empty."),

  body("experience").optional().isArray().withMessage("Experience must be an array."),
  body("experience.*.company").if(body("experience").exists()).trim().notEmpty().withMessage("Experience company is required."),
  body("experience.*.position").if(body("experience").exists()).trim().notEmpty().withMessage("Experience position is required."),
  body("experience.*.startDate").if(body("experience").exists()).notEmpty().withMessage("Experience start date is required.").isISO8601().withMessage("Experience start date must be a valid date."),
  body("experience.*.endDate").optional().isISO8601().withMessage("Experience end date must be a valid date."),
  body("experience.*.currentlyWorking").optional().isBoolean().withMessage("Currently working must be a boolean."),

  body("education").optional().isArray().withMessage("Education must be an array."),
  body("education.*.institute").if(body("education").exists()).trim().notEmpty().withMessage("Institute is required."),
  body("education.*.degree").if(body("education").exists()).trim().notEmpty().withMessage("Degree is required."),
  body("education.*.field").if(body("education").exists()).trim().notEmpty().withMessage("Field of study is required."),
  body("education.*.startYear").optional().isInt().withMessage("Start year must be a valid year."),
  body("education.*.endYear").optional().isInt().withMessage("End year must be a valid year."),

  body("certifications").optional().isArray().withMessage("Certifications must be an array."),
  body("certifications.*.title").if(body("certifications").exists()).trim().notEmpty().withMessage("Certification title is required."),
  body("certifications.*.organization").if(body("certifications").exists()).trim().notEmpty().withMessage("Certification organization is required."),
  body("certifications.*.issueDate").optional().isISO8601().withMessage("Issue date must be a valid date."),
  body("certifications.*.certificateUrl").optional().trim().isURL().withMessage("Certificate url must be a valid URL."),

  body("languages").optional().isArray().withMessage("Languages must be an array."),
  body("languages.*.language").optional().trim().notEmpty().withMessage("Language cannot be empty."),
  body("languages.*.level")
    .optional()
    .isIn(["Beginner", "Intermediate", "Advanced", "Native"]).withMessage("Invalid language level."),

  body("projects").optional().isArray().withMessage("Projects must be an array."),
  body("projects.*.title").if(body("projects").exists()).trim().notEmpty().withMessage("Project title is required."),
  body("projects.*.description").if(body("projects").exists()).trim().notEmpty().withMessage("Project description is required."),
  body("projects.*.technologies").optional().isArray().withMessage("Technologies must be an array."),
  body("projects.*.github").optional().trim().isURL().withMessage("Project github link must be a valid URL."),
  body("projects.*.liveDemo").optional().trim().isURL().withMessage("Project live demo link must be a valid URL."),

  body("jobPreferences")
    .optional()
    .isArray().withMessage("Job preferences must be an array."),
  body("jobPreferences.*")
    .isIn(["Full Time", "Part Time", "Internship", "Contract", "Remote", "Hybrid"])
    .withMessage("Invalid job preference."),

  body("currentCompany").optional().trim(),

  body("currentPosition").optional().trim(),

  body("availability")
    .optional()
    .isIn(["Immediate", "15 Days", "30 Days", "60 Days"]).withMessage("Invalid availability value."),

  body("openToWork").optional().isBoolean().withMessage("Open to work must be a boolean."),

  body("visibility")
    .optional()
    .isIn(["Public", "Private", "Employers Only"]).withMessage("Invalid visibility value."),

  body("verification").optional().isBoolean().withMessage("Verification must be a boolean."),
];