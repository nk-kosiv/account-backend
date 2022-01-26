import {
  getGroupByIdModel,
  getGroupByNameModel,
  getAllGroupsModel,
  createGroupModel,
  updateGroupModel,
  deleteGroupModel,
} from "../integrations/db/repositories/group.repository";
import { GroupProps } from "../api/types/group";

export const getGroupByIdService = async (id: string) =>
  getGroupByIdModel(id);

export const getAllGroupsService = async () =>
  getAllGroupsModel();

export const getGroupByNameService = async (name: string) =>
  getGroupByNameModel(name);

export const createNewGroupService = async (payload: GroupProps) =>
  createGroupModel(payload);

export const updateGroupService = async (payload: GroupProps) =>
  updateGroupModel(payload);

export const deleteGroupService = async (id: string) =>
  deleteGroupModel(id);
  