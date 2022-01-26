import { Request, Response, NextFunction } from "express";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-console
    console.log({ method: req.method, body: req.body, paramsID: req.params.id });
    next();
  };