import { body } from "express-validator";

export const addJobValidation = [
  body("title").trim().notEmpty().withMessage("Title is required."),

  body("description").trim().notEmpty().withMessage("Description is required."),

  // body("companyId")
  //   .notEmpty().withMessage("Company id is required.")
  //   .isMongoId().withMessage("Company id must be a valid id."),

  body("location").trim().notEmpty().withMessage("Location is required."),

  body("city").trim().notEmpty().withMessage("City is required."),

  body("country").trim().notEmpty().withMessage("Country is required."),

  body("salary")
    .notEmpty().withMessage("Salary is required.")
    .isFloat({ min: 0 }).withMessage("Salary must be a positive number."),

  body("jobType")
    .notEmpty().withMessage("Job type is required.")
    .isIn(["full-time", "part-time", "contract", "internship"]).withMessage("Invalid job type."),

  body("workMode")
    .notEmpty().withMessage("Work mode is required.")
    .isIn(["remote", "on-site", "hybrid"]).withMessage("Invalid work mode."),

  body("skills")
    .isArray({ min: 1 }).withMessage("At least one skill is required."),
  body("skills.*").trim().notEmpty().withMessage("Skill cannot be empty."),

  body("experience").trim().notEmpty().withMessage("Experience is required."),

  body("status")
    .optional()
    .isIn(["open", "closed"]).withMessage("Invalid status value."),

  body("category").trim().notEmpty().withMessage("Category is required."),

  body("department").trim().notEmpty().withMessage("Department is required."),

  body("education").trim().notEmpty().withMessage("Education is required."),

  body("responsibilities").trim().notEmpty().withMessage("Responsibilities are required."),

  body("requirements").trim().notEmpty().withMessage("Requirements are required."),

  body("vacancies")
    .notEmpty().withMessage("Vacancies is required.")
    .isInt({ min: 1 }).withMessage("Vacancies must be a positive integer."),

  body("benefits").trim().notEmpty().withMessage("Benefits are required."),

  body("applyLastDate")
    .notEmpty().withMessage("Apply last date is required.")
    .isISO8601().withMessage("Apply last date must be a valid date.")
    .toDate(),

  body("views").optional().isInt({ min: 0 }).withMessage("Views must be a positive integer."),

  body("isFeatured").optional().isBoolean().withMessage("isFeatured must be a boolean."),

  body("isUrgent").optional().isBoolean().withMessage("isUrgent must be a boolean."),

  // body("slug").trim().notEmpty().withMessage("Slug is required."),
];
