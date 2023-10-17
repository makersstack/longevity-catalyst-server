import { createServer, Server } from "http";
import mysql from "mysql2/promise";
import app from "./app";
import config from "./config/index";
// let mysqlConnection: Pool;
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    const mysqlConnection = mysql.createPool({
      host: config.database_url,
      user: config.mysql_user,
      password: config.mysql_password,
      database: config.mysql_database,
    });

    console.log("🥌 Database connected successfully");

    server = createServer(app);

    app.set("mysqlConnection", mysqlConnection);

    server.listen(config.port, () => {
      console.log(`UMP listen on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database ${error}`);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGABRT", () => {
  console.log("SIGTERM is Received");
  if (server) {
    server.close();
  }
});
