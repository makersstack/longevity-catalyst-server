/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routers from "./app/routes";
import config from "./config";
import sequelize from "./config/sequelize-config";
import { errorlogger, logger } from "./shared/logger";

const app: Application = express();

const allowedOrigins = config.allowed_origins?.split(",") ?? [];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is included in the allowed origins array
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// TODO
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.set("mysqlConnection", null);

// Application routes
app.use("/api/v1", routers);

app.use(globalErrorHandler);

// Server Start Message
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome HTTP SERVER",
  });
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(`🛢 Database is connected successfull`);
  })
  .catch((error) => {
    errorlogger.error("Sequelize failed to connect to the database:", error);
  });

// Handle Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Resource not found",
    error: {
      path: req.originalUrl,
      message: "The requested API route does not exist.",
    },
  });
});

export default app;
