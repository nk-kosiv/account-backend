import { Sequelize, Model, DataTypes, Optional } from "sequelize";

import { dbConfiguration } from "../../../config";

interface GroupAttributes {
  id: number;
  name: string;
}

type GroupCreationAttributes = Optional<GroupAttributes, "id">;

interface GroupInstance
  extends Model<GroupAttributes, GroupCreationAttributes>,
    GroupAttributes {}

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

const GroupModel = sequelize.define<GroupInstance>(
  "Groups",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "Groups",
  }
);

export default GroupModel;
