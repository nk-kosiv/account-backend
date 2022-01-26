import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

const asyncHandler =
  (
    fn: (
      arg0: Request<ParamsDictionary, unknown, unknown, ParsedQs, Record<string,  unknown>>,
      arg1: Response< unknown, Record<string,  unknown>>,
      arg2: NextFunction
    ) =>  unknown
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
