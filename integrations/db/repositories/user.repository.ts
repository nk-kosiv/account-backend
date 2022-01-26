import sq from "sequelize";
import { UserProps } from "../../../api/types/user";
import { User } from "../models/user.associations";

async function getAllSuggestedUsersModel(value: string, limit: number) {
  return User.findAll({
    limit,
    where: {
      login: sq.where(
        sq.fn("LOWER", sq.col("login")),
        "LIKE",
        "%" + value + "%"
      ),
    },
  });
}

async function getUserByIdModel(id: string) {
  return User.findOne({ where: { id } });
}

async function getUserByLoginModel(login: string) {
  return User.findOne({ where: { login } });
}

async function createUserModel(payload: UserProps) {
  const { login, age, password } = payload;

  return User.create({
    login,
    password,
    age,
    isDeleted: false,
  });
}

async function updateUserModel(payload: UserProps) {
  const { login, id, age, password } = payload;

  const updatedUser = await User.update(
    { login, age, password },
    {
      where: {
        id,
      },
    }
  );
  return updatedUser[0];
}

async function deleteUserModel(id: string) {
  const softDeleteUser = await User.update(
    { isDeleted: true },
    {
      where: { id },
    }
  );

  return softDeleteUser[0];
}

export {
  getAllSuggestedUsersModel,
  getUserByIdModel,
  getUserByLoginModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
};
