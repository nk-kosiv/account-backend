/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

interface groupValidatorScheme {
  validateAsync: (body: any) => typeof body;
}

export const groupValidator =
  (schema: groupValidatorScheme) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validateAsync(req.body);

      if (value) {
        next();
      }
    } catch (e) {
      const { details }: any = e;
      const messages = details.map((i: any) => i.message);

      res.status(400).json({ error: messages });
    }
  };
