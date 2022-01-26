/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { INTERNAL_SERVER_ERROR } from "../../../constants/httpStatus";
import Logger from "./winstonLogger";

interface Error {
  method: string;
  body: any;
}

const serverLogger = (err: Error, req: Request, res: Response) => {
  Logger.error({
    method_name: err.method,
    arguments: err.body,
    error: err,
  });

  res
    .status(INTERNAL_SERVER_ERROR)
    .send({
      method_name: err.method,
      arguments: err.body,
      error: err,
    })
    .end();
};

export default serverLogger;
