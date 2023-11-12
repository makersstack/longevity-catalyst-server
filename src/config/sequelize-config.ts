import * as mysql2 from "mysql2"; // update
import { Sequelize } from "sequelize";
import config from "./index";

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: mysql2, // Update
  host: config.database_url,
  username: config.mysql_user,
  password: config.mysql_password,
  database: config.mysql_database,
  logging: false,
});

export default sequelize;
