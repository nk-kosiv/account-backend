import { GroupProps } from "../../../api/types/group";
import { Group, UsersGroups } from "../models/user.associations";

async function getGroupByIdModel(id: string) {
  return Group.findOne({ where: { id } });
}

async function getGroupByNameModel(name: string) {
  return Group.findOne({ where: { name } });
}

async function getAllGroupsModel() {
  return Group.findAll();
}

async function createGroupModel(payload: GroupProps) {
  const { name } = payload;

  return Group.create({
    name,
  });
}

async function updateGroupModel(payload: GroupProps) {
  const { id, name } = payload;

  const updatedGroup = await Group.update(
    { name },
    {
      where: {
        id,
      },
    }
  );
  return updatedGroup[0];
}

async function deleteGroupModel(id: string) {
  const deleteGroup = await Group.destroy({
    where: { id },
  });

  const isDeleted = !!deleteGroup;

  if (isDeleted) {
    await UsersGroups.destroy({
      where: { group_id: id },
      truncate: true,
    });
  }

  return isDeleted;
}

export {
  getAllGroupsModel,
  getGroupByIdModel,
  getGroupByNameModel,
  createGroupModel,
  updateGroupModel,
  deleteGroupModel,
};
