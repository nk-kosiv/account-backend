import { config } from "dotenv";
config();

export const dbConfiguration = {
  userName: process.env.DB_USER_NAME as string,
  password: process.env.DB_PASSWORD as string, 
  db: process.env.DB_DATA_BASE as string,
  host: process.env.DB_HOST as string,
};

export const routeConfigurations = {
  port: process.env.PORT,
};

export const authenticationSecret = {
  secret: process.env.SECRET,
};