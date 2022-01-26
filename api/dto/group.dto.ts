import { GroupProps } from "../../api/types/group";

const groupIdDTO = (id: string) => id;

const groupNameDTO = (name: string) => name;

const groupCreateDTO = (payload: GroupProps) => {
  const { id, name } = payload;

  return { id, name };
};
const groupUpdateDTO = (payload: GroupProps) => {
  const { id, name } = payload;

  return { id, name };
};

export { groupIdDTO, groupNameDTO, groupCreateDTO, groupUpdateDTO };
