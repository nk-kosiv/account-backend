import Joi from "joi";

export const schemes = {
  updateUser: Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    password: Joi.string()
      .pattern(new RegExp("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*"))
      .required(),
    isDeleted: Joi.boolean().required(),
  }),
  createUser: Joi.object({
    login: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    password: Joi.string()
      .pattern(new RegExp("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*"))
      .required(),
  }),
};
