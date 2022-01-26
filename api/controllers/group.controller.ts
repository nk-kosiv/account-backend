import { Request, Response, NextFunction } from "express";

import {
  getGroupByNameService,
  getGroupByIdService,
  createNewGroupService,
  updateGroupService,
  deleteGroupService,
  getAllGroupsService,
} from "../../services/group.service";
import {
  groupCreateDTO,
  groupUpdateDTO,
  groupIdDTO,
  groupNameDTO,
} from "../dto/group.dto";
import {
  sendStatusSuccess,
  sendStatusNoContent,
  sendStatusConflict,
} from "../../integrations/http/sendStatus";
import { GroupProps } from "../types/group";

export const getGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId: string = groupIdDTO(req.params.id);
    const group = await getGroupByIdService(groupId);

    if (!group) return sendStatusNoContent(res);

    sendStatusSuccess(res, group);
  } catch (e) {
    return next(e);
  }
};

export const getAllGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await getAllGroupsService();

    if (!groups) return sendStatusNoContent(res);

    sendStatusSuccess(res, groups);
  } catch (e) {
    return next(e);
  }
};

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupName: string = groupNameDTO(req.body.name);
    const group = await getGroupByNameService(groupName);

    // Checking if group exist in our base
    if (group) {
      return sendStatusConflict(res, {
        message: `Group with name : ${group.name}, already exist!`,
      });
    }

    const body: GroupProps = groupCreateDTO(req.body);
    const newGroup = await createNewGroupService(body);

    if (!newGroup) return sendStatusNoContent(res);

    sendStatusSuccess(res, {
      message: `Group with name: ${newGroup.name}, was created successfully!`,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: GroupProps = groupUpdateDTO(req.body);
    const updatedGroup = await updateGroupService(body);

    if (!updatedGroup) {
      return sendStatusNoContent(res);
    }

    sendStatusSuccess(res, {
      message: `Your group credentials was updated successfully!`,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId: string = groupIdDTO(req.params.id);
    const deleteGroup = await deleteGroupService(groupId);

    if (!deleteGroup) {
      return sendStatusNoContent(res);
    }

    sendStatusSuccess(res, {
      message: `Group was deleted!`,
    });
  } catch (e) {
    return next(e);
  }
};
