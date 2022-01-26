/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { DatabaseError, BaseError } from "sequelize";
import httpMocks from "node-mocks-http";

import * as services from "../../../services/group.service";
import {
  createGroupController,
  updateGroupController,
  getGroupController,
  getAllGroupsController,
  deleteGroupController,
} from "../group.controller";

describe("group controller related tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getGroupController should throw error if id is empty string", async () => {
    const req = { params: { id: "" } };
    const res = {};
    const next = jest.fn();
    await getGroupController(req as unknown as Request, res as Response, next);

    const errorMessage = 'invalid input syntax for integer: ""';
    expect(next).toBeCalledWith(new DatabaseError(new BaseError(errorMessage)));
  });

  it("getGroupController should retrieve one member by id and send response correctly", async () => {
    const user = { id: "1", login: "nazar" };

    jest
      .spyOn(services, "getGroupByIdService")
      .mockImplementation(() => user as any);

    const req = { params: { id: "1" } };

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await getGroupController(
      req as unknown as Request,
      res as unknown as Response,
      next
    );

    const data = res._getJSONData();

    expect(services.getGroupByIdService).toBeCalledWith("1");
    expect(res._isJSON()).toBeTruthy();
    expect(res.statusCode).toEqual(200);
    expect(data.login).toEqual("nazar");
  });

  it("getAllGroupsController should return response status 200", async () => {
    const req = {};
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await getAllGroupsController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    expect(res.statusCode).toEqual(200);
  });

  it("updateGroupController should send 204 if body is empty", async () => {
    const req = { body: {} };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await updateGroupController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    expect(res.statusCode).toEqual(204);
  });

  it("createGroupController should throw error if body is empty", async () => {
    const req = { body: {} };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await createGroupController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    expect(next).toBeCalledWith(
      new Error('WHERE parameter "name" has invalid "undefined" value')
    );
  });

  it("deleteGroupController should send error if id is empty", async () => {
    const req = { params: { id: "" } };
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await deleteGroupController(
      req as unknown as Request,
      res as Response,
      next as NextFunction
    );

    const errorMessage = 'invalid input syntax for integer: ""';
    expect(next).toBeCalledWith(new DatabaseError(new BaseError(errorMessage)));
  });
});
