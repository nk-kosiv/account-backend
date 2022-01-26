import express from "express";

import { schemes } from "../middlewears/validation/user/schemes/user.scheme";
import { userValidator } from "../middlewears/validation";

import {
  createUserController,
  updateUserController,
  getUserController,
  deleteUserController,
  getUsersListController,
} from "../controllers/users.controller";
import asyncHandler from "../../api/middlewears/asyncHandler/asyncHandler";
import { httpLogger } from "../middlewears/loggers/httpLogger";
import { validateToken } from "../middlewears/authentication/validateToken";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get(
  "/user/:id",
  httpLogger,
  validateToken,
  asyncHandler(getUserController)
);

router.get(
  "/user-suggest/:id",
  httpLogger,
  validateToken,
  asyncHandler(getUsersListController)
);

router.post(
  "/user",
  httpLogger,
  validateToken,
  userValidator(schemes.createUser),
  asyncHandler(createUserController)
);

router.put(
  "/user",
  httpLogger,
  validateToken,
  userValidator(schemes.updateUser),
  asyncHandler(updateUserController)
);

router.delete("/user/:id", httpLogger, validateToken, deleteUserController);

export default router;
