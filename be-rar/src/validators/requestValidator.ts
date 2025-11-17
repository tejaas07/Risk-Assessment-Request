import Joi from "joi";

export const addRequestSchema = Joi.object({
  company: Joi.string().min(2).required().messages({
    "string.empty": "Company name is required",
    "string.min": "Company name must be at least 2 characters",
  }),

  industry: Joi.string().required().messages({
    "string.empty": "Industry is required",
  }),

  contact: Joi.string().min(2).required().messages({
    "string.empty": "Contact person is required",
    "string.min": "Contact name must be at least 2 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),

  location: Joi.string().required().messages({
    "string.empty": "Job site location is required",
  }),

  activity: Joi.string().required().messages({
    "string.empty": "Type of activity is required",
  }),

  hazards: Joi.string().allow("").optional().messages({
    "string.base": "Hazards must be a string",
  }),

  timeframe: Joi.date().iso().required().messages({
    "date.base": "Preferred timeframe must be a valid date",
    "any.required": "Preferred timeframe is required",
  }),
});
