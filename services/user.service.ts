import {
  getAllSuggestedUsersModel,
  getUserByIdModel,
  getUserByLoginModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
} from "../integrations/db/repositories/user.repository";
import { UserProps } from "../api/types/user";

export const getAutoSuggestUsersService = async (
  loginSubstring: string,
  limit: number
) => {
  const inputValue = loginSubstring.trim().toLowerCase();

  const user = await getAllSuggestedUsersModel(inputValue, limit);

  return user.sort((a, b) => (a.login > b.login ? 1 : -1));
};

export const getUserByIdService = async (id: string) =>
  getUserByIdModel(id);

export const getUserByLoginService = async (login: string) =>
  getUserByLoginModel(login);

export const createNewUserService = async (payload: UserProps) =>
  createUserModel(payload);

export const updateUserService = async (payload: UserProps) =>
  updateUserModel(payload);

export const deleteUserService = async (id: string) =>
  deleteUserModel(id);
