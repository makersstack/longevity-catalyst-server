import { Sequelize } from "sequelize";
import config from "./index";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.database_url,
  username: config.mysql_user,
  password: config.mysql_password,
  database: config.mysql_database,
  logging: false,
});

export default sequelize;
