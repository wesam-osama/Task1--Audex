import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).max(100).required(),

  role: Joi.string()
    .valid("ADMIN", "MANAGER", "USER")
    .default("USER"),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),

  password: Joi.string().min(6).max(100).required(),
});