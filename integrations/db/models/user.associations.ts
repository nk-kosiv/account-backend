import User from "./user.entity";
import Group from "./group.entity";
import UsersGroups from './users_groups.entity';


User.belongsToMany(Group, {
  foreignKey: "group_id",
  through: UsersGroups,
});
Group.belongsToMany(User, {
  foreignKey: "user_id",
  through: UsersGroups,
});


export { Group, User, UsersGroups };
