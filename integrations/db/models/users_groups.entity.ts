import { Sequelize, Model, DataTypes, Optional } from "sequelize";

import { dbConfiguration } from "../../../config";

interface UsersGroupsAttributes {
  id: number;
  group_id: string;
  user_id: string;
}

type UsersGroupsCreationAttributes = Optional<UsersGroupsAttributes, "id">;

interface UsersGroupsInstance
  extends Model<UsersGroupsAttributes, UsersGroupsCreationAttributes>,
    UsersGroupsAttributes {}

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

const UsersGroupsModel = sequelize.define<UsersGroupsInstance>(
  "UsersGroups",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "UsersGroups",
  }
);

export default UsersGroupsModel;
