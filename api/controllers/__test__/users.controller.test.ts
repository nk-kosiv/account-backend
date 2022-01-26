/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { DatabaseError, BaseError } from "sequelize";
import httpMocks from "node-mocks-http";

import * as services from "../../../services/user.service";
import {
  createUserController,
  updateUserController,
  getUserController,
  deleteUserController,
  getUsersListController,
} from "../users.controller";

describe("user controller related tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getUserController should throw error if id is empty string", async () => {
    const req = { params: { id: "" } };
    const res = {};
    const next = jest.fn();
    await getUserController(req as unknown as Request, res as Response, next);

    const errorMessage = 'invalid input syntax for integer: ""';
    expect(next).toBeCalledWith(new DatabaseError(new BaseError(errorMessage)));
  });

  it("getUserController should retrieve one member by id and send response correctly", async () => {
    const user = { id: "1", login: "nazar" };

    jest
      .spyOn(services, "getUserByIdService")
      .mockImplementation(() => user as any);

    const req = { params: { id: "1" } };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await getUserController(
      req as unknown as Request,
      res as unknown as Response,
      next
    );

    const data = res._getJSONData();

    expect(services.getUserByIdService).toBeCalledWith("1");
    expect(res._isJSON()).toBeTruthy();
    expect(res.statusCode).toEqual(200);
    expect(data.login).toEqual("nazar");
  });

  it("getUsersListController should throw error if id is empty string", async () => {
    const req = { params: { id: null } };
    const res = {};
    const next = jest.fn();

    await getUsersListController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    const errorMessage = "Cannot read property 'trim' of null";
    expect(next).toBeCalledWith(new Error(errorMessage));
  });

  it("updateUserController should send 204 if body is empty", async () => {
    const req = { body: {} };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await updateUserController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    expect(res.statusCode).toEqual(204);
  });

  it("createUserController should throw error if body is empty", async () => {
    const req = { body: {} };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await createUserController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    expect(next).toBeCalledWith(
      new Error('WHERE parameter "login" has invalid "undefined" value')
    );
  });

  it("deleteUserController should send 204 if id is empty", async () => {
    const req = { params: { id: "" } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await deleteUserController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    const errorMessage = 'invalid input syntax for integer: ""';
    expect(next).toBeCalledWith(new DatabaseError(new BaseError(errorMessage)));
  });
});
