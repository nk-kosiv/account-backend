import express from "express";
import cors from "cors";

import { routeConfigurations } from "./config";
import usersRouter from "./api/route/user.route";
import groupRouter from "./api/route/group.route";
import usersGroupsRouter from "./api/route/users_groups.route";
import serverLogger from "./api/middlewears/loggers/serverLogger";

const app = express();
app.use(cors());

app.use("/users", usersRouter);
app.use("/group", groupRouter);
app.use("/users-groups", usersGroupsRouter);

app.use(serverLogger);

app.listen(routeConfigurations.port, () =>
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${routeConfigurations.port}`)
);
