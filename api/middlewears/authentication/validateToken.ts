import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import {
  sendStatusUnauthorized,
  sendStatusForbidden,
} from "../../../integrations/http/sendStatus";
import { authenticationSecret } from "../../../config";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers["user-access-token"] as string;

  if (!token) {
    return sendStatusUnauthorized(res, {
      message: `No token provided!`,
    });
  }

  return jwt.verify(token, authenticationSecret.secret as string, (err) => {
    if (err) {
      return sendStatusForbidden(res, {
        message: `Failed to authenticate token!`,
      });
    }

    return next();
  });
};
