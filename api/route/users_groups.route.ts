import express from "express";

import { usersGroupsValidationScheme } from "../middlewears/validation/users-groups/schemes/users_groups.scheme";
import { usersGroupsValidator } from "../middlewears/validation";

import { addUsersToGroupController } from "../controllers/users_groups.controller";
import asyncHandler from "../../api/middlewears/asyncHandler/asyncHandler";
import { httpLogger } from "../middlewears/loggers/httpLogger";
import { validateToken } from "../middlewears/authentication/validateToken";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post(
  "/groups/:id/users",
  httpLogger,
  validateToken,
  usersGroupsValidator(usersGroupsValidationScheme),
  asyncHandler(addUsersToGroupController)
);

export default router;
