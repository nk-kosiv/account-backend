import { UserProps } from "../../api/types/user";

const userIdDTO = (id: string) => id;

const userBySubstringDTO = (substring: string) => substring;

const useLoginDTO = (login: string) => login;

const userCreateDTO = (payload: UserProps) => {
  const { login, password, age } = payload;

  return { login, age, password };
};
const userUpdateDTO = (payload: UserProps) => {
  const { login, id, age, password } = payload;

  return { login, id, age, password };
};

export { userIdDTO, useLoginDTO, userCreateDTO, userUpdateDTO, userBySubstringDTO };
