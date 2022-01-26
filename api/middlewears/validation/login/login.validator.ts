/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

interface UserValidatorScheme {
  validateAsync: (body: any) => typeof body;
}

export const loginValidator =
  (schema: UserValidatorScheme) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validateAsync(req.body);

      if (value) {
        next();
      }
    } catch (e) {
      const { details }: any = e;
      const messages = details.map((i: any) => i.message);
      const passwordError = details.find(
        (i: any) => i.context.key === "password"
      );

      if (passwordError) {
        res.status(400).json({
          error: `"password" with value "${passwordError.context.value}" fails, it should contain at least one letter and one number`,
        });
      } else {
        res.status(400).json({ error: messages });
      }
    }
  };
