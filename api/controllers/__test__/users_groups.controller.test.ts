/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import httpMocks from "node-mocks-http";

import { addUsersToGroupController } from "../users_groups.controller";

describe("user-group controller related tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("addUsersToGroupController should throw error if body is empty string", async () => {
    const req = { body: {} };
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await addUsersToGroupController(
      req as unknown as Request,
      res as Response,
      next
    );

    const errorMessage = "Unexpected token u in JSON at position 0";
    expect(next).toBeCalledWith(new SyntaxError(errorMessage));
  });
});
