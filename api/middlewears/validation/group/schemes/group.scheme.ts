import Joi from "joi";

export const groupValidatorScheme = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
});
