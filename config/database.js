/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER_NAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATA_BASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER_NAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATA_BASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER_NAME ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATA_BASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
