import express from "express";

import { groupValidatorScheme } from "../middlewears/validation/group/schemes/group.scheme";
import { groupValidator } from "../middlewears/validation";

import {
  createGroupController,
  updateGroupController,
  getGroupController,
  getAllGroupsController,
  deleteGroupController,
} from "../controllers/group.controller";
import asyncHandler from "../../api/middlewears/asyncHandler/asyncHandler";
import { httpLogger } from "../middlewears/loggers/httpLogger";
import { validateToken } from "../middlewears/authentication/validateToken";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/groups/:id", httpLogger, validateToken, asyncHandler(getGroupController));

router.get("/groups", httpLogger, validateToken, asyncHandler(getAllGroupsController));

router.post(
  "/groups",
  httpLogger,
  validateToken,
  groupValidator(groupValidatorScheme),
  asyncHandler(createGroupController)
);

router.put(
  "/groups",
  httpLogger,
  validateToken,
  groupValidator(groupValidatorScheme),
  asyncHandler(updateGroupController)
);

router.delete("/groups/:id", httpLogger, validateToken, asyncHandler(deleteGroupController));

export default router;
