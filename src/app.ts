import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import routers from "./app/routes";
import sequelize from "./config/sequelize-config";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.set("mysqlConnection", null);

// Application routes
app.use("/api/v1", routers);

// app.use(globalErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log("Server Connected Success");
  })
  .catch((error) => {
    console.error("Sequelize failed to connect to the database:", error);
  });

// Handle Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
