import express from "express";

import { schemes } from "../middlewears/validation/login/schemes/login.scheme";
import { loginValidator } from "../middlewears/validation";

import { authenticate } from "../controllers/login.controller";
import asyncHandler from "../../api/middlewears/asyncHandler/asyncHandler";
import { httpLogger } from "../middlewears/loggers/httpLogger";

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post(
  "/login",
  httpLogger,
  loginValidator(schemes.login),
  asyncHandler(authenticate)
);

export default router;
