/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import {
  HTTP_STATUS_NO_CONTENT,
  HTTP_STATUS_SUCCESS,
  HTTP_STATUS_CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN
} from "../../constants/httpStatus";

export const sendStatusSuccess = (response: Response, payload: any): void => {
  response.status(HTTP_STATUS_SUCCESS).json(payload);
};

export const sendStatusNoContent = (response: Response): void => {
  response.status(HTTP_STATUS_NO_CONTENT);
};

export const sendStatusConflict = (response: Response, payload: any): void => {
  response.status(HTTP_STATUS_CONFLICT).json(payload);
};

export const sendStatusUnauthorized = (
  response: Response,
  payload: any
): void => {
  response.status(UNAUTHORIZED).json(payload);
};

export const sendStatusForbidden = (
  response: Response,
  payload: any
): void => {
  response.status(FORBIDDEN).json(payload);
};
