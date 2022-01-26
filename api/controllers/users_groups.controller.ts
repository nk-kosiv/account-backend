import { Request, Response, NextFunction } from "express";

import { addUsersToGroupService } from "../../services/users_groups.service";
import { userGroupsCreateDTO } from "../dto/user_group.dto";
import {
  sendStatusSuccess,
  sendStatusNoContent,
} from "../../integrations/http/sendStatus";
import { UsersGroupsProps } from "../types/users_groups";

export const addUsersToGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: UsersGroupsProps = userGroupsCreateDTO(req.body);

    const newUsersGroups = await addUsersToGroupService(body);

    if (!newUsersGroups) return sendStatusNoContent(res);

    sendStatusSuccess(res, {
      message: `users groups with name: ${body.groupId}, was created successfully!`,
    });
  } catch (e) {
    return next(e);
  }
};
