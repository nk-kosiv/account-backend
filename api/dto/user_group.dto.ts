import { UsersGroupsProps } from "../../api/types/users_groups";

export const userGroupsCreateDTO = (payload: UsersGroupsProps) => {
  const { userIds, groupId } = payload;

  return { userIds, groupId };
};
