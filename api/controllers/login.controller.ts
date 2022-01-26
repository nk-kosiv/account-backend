import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { getUserByLoginService } from "../../services/user.service";
import { useLoginDTO } from "../dto/user.dto";
import { sendStatusUnauthorized } from "../../integrations/http/sendStatus";
import { authenticationSecret } from "../../config";

export const authenticate = async (req: Request, res: Response) => {
  const userLogin: string = useLoginDTO(req.body.login);
  const user = await getUserByLoginService(userLogin);

  if (!user || user.isDeleted) {
    return sendStatusUnauthorized(res, {
      message: `Bad login password combination!`,
    });
  }

  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, authenticationSecret.secret as string, {
    expiresIn: 1000000000,
  });

  return res.send(token);
};
