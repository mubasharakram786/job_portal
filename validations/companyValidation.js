import { body } from "express-validator";

export const recruiterProfileValidation = [
  body("companyName").trim().notEmpty().withMessage("Company name is required."),

  body("companyLogo").optional().trim(),

  body("companyBanner").optional().trim(),

  body("industry").trim().notEmpty().withMessage("Industry is required."),

  body("establishedYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage(`Established year must be between 1800 and ${new Date().getFullYear()}.`),

  body("companySize")
    .optional()
    .isIn(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .withMessage("Invalid company size."),

  body("website").optional().trim().isURL().withMessage("Website must be a valid URL."),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Email must be valid.")
    .normalizeEmail(),

  body("phone").optional().trim(),

  body("country").trim().notEmpty().withMessage("Country is required."),

  body("state").trim().notEmpty().withMessage("State is required."),

  body("city").trim().notEmpty().withMessage("City is required."),

  body("address").optional().trim(),

  body("about")
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage("About must not exceed 2000 characters."),

  body("recruiterName").trim().notEmpty().withMessage("Recruiter name is required."),

  body("designation").optional().trim(),

  body("recruiterEmail")
    .optional()
    .trim()
    .isEmail().withMessage("Recruiter email must be valid.")
    .normalizeEmail(),

  body("recruiterPhone").optional().trim(),

  body("socialLinks.linkedin").optional().trim().isURL().withMessage("LinkedIn link must be a valid URL."),
  body("socialLinks.facebook").optional().trim().isURL().withMessage("Facebook link must be a valid URL."),
  body("socialLinks.twitter").optional().trim().isURL().withMessage("Twitter link must be a valid URL."),
  body("socialLinks.instagram").optional().trim().isURL().withMessage("Instagram link must be a valid URL."),

  body("status")
    .optional()
    .isIn(["pending", "approved", "rejected"]).withMessage("Invalid status value."),

  body("isActive").optional().isBoolean().withMessage("isActive must be a boolean."),

  body("totalJobsPosted").optional().isInt({ min: 0 }).withMessage("Total jobs posted must be a positive integer."),

  body("totalFollowers").optional().isInt({ min: 0 }).withMessage("Total followers must be a positive integer."),
];
