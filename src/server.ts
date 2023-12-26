import { createServer, Server } from "http";
import app from "./app";
import config from "./config/index";
import sequelize from "./config/sequelize-config";
import { errorlogger, logger } from "./shared/logger";

let server: Server;

async function startServer() {
  try {
    await sequelize.sync();
    server = createServer(app);

    server.listen(config.port, () => {
      logger.info(`Lc listen on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error(`Failed to connect database`, error);
  }
}
startServer();

process.on("unhandledRejection", (error) => {
  errorlogger.error(`Unhandled Rejection: ${error}`);
});

process.on("SIGABRT", () => {
  if (server) {
    server.close(() => {
      logger.info("Server is gracefully closed");
      process.exit(1);
    });
  }
});
