import { UsersGroups } from "../models/user.associations";
import { UsersGroupsProps } from "../../../api/types/users_groups";

export async function addUsersToGroupModel(payload: UsersGroupsProps) {
  const { groupId, userIds } = payload;
  const extractUserIds: string[] = JSON.parse(userIds);

  const usersGroups = extractUserIds.map((el) => {
    return { group_id: groupId, user_id: el };
  });

  return UsersGroups.bulkCreate(usersGroups);
}
