import Joi from "joi";

export const usersGroupsValidationScheme = Joi.object({
  userIds: Joi.string().required(),
  groupId: Joi.string().required(),
});