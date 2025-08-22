import Joi from "joi"

export const registerUserValidation = Joi.object({
    name : Joi.string().required().trim(),
    email : Joi.string().required().trim().email(),
    password : Joi.string().required().trim().min(8)
})