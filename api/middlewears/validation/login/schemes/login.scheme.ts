import Joi from "joi";

export const schemes = {
  login: Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*"))
      .required(),
  }),
};
