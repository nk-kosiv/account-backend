import { addUsersToGroupModel } from "../integrations/db/repositories/users-groups.repository";
import { UsersGroupsProps } from "../api/types/users_groups";

export const addUsersToGroupService = async (
 payload: UsersGroupsProps
) => addUsersToGroupModel(payload);
