import { Sequelize, Model, DataTypes, Optional } from "sequelize";

import { dbConfiguration } from "../../../config";

interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: string;
  isDeleted: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const sequelize = new Sequelize(
  dbConfiguration.db,
  dbConfiguration.userName,
  dbConfiguration.password,
  {
    host: dbConfiguration.host,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const UserModel = sequelize.define<UserInstance>(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Users",
  }
);

export default UserModel;
