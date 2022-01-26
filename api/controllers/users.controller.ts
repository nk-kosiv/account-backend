import { Request, Response, NextFunction } from "express";

import {
  getAutoSuggestUsersService,
  getUserByLoginService,
  getUserByIdService,
  createNewUserService,
  updateUserService,
  deleteUserService,
} from "../../services/user.service";
import {
  userCreateDTO,
  userUpdateDTO,
  userIdDTO,
  useLoginDTO,
  userBySubstringDTO,
} from "../dto/user.dto";
import {
  sendStatusSuccess,
  sendStatusNoContent,
  sendStatusConflict,
} from "../../integrations/http/sendStatus";
import { UserProps } from "../types/user";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = userIdDTO(req.params.id);
    const user = await getUserByIdService(userId);

    if (!user) return sendStatusNoContent(res);

    sendStatusSuccess(res, user);
  } catch (e) {
    return next(e);
  }
};

export const getUsersListController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginSubstring: string = userBySubstringDTO(req.params.id);
    const limit = 6;

    const listOfUsers = await getAutoSuggestUsersService(loginSubstring, limit);

    sendStatusSuccess(res, listOfUsers);
  } catch (e) {
    return next(e);
  }
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userLogin: string = useLoginDTO(req.body.login);
    const user = await getUserByLoginService(userLogin);

    // Checking if user exist in our base
    if (user) {
      return sendStatusConflict(res, {
        message: `User with login : ${user.login}, already exist!`,
      });
    }

    const body: UserProps = userCreateDTO(req.body);
    const newUser = await createNewUserService(body);

    if (!newUser) return sendStatusNoContent(res);

    sendStatusSuccess(res, {
      message: `User with login name: ${newUser.login}, was created successfully!`,
    });
  } catch (e) {
    return next(e);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: UserProps = userUpdateDTO(req.body);
    const updatedUser = await updateUserService(body);

    if (!updatedUser) {
      return sendStatusNoContent(res);
    }

    sendStatusSuccess(res, {
      message: `Your credentials was updated successfully!`,
    });
  } catch (e) {
    return next(e);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = userIdDTO(req.params.id);

    const softDeleteUser = await deleteUserService(userId);

    if (!softDeleteUser) {
      return sendStatusNoContent(res);
    }

    sendStatusSuccess(res, {
      message: `User was deleted!`,
    });
  } catch (e) {
    return next(e);
  }
};
