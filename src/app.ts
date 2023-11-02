import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";

import routers from "./app/routes";
import sequelize from "./config/sequelize-config";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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
    console.log("Server Connected");
  })
  .catch((error) => {
    console.error("Sequelize failed to connect to the database:", error);
  });

// Handle Not Found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found Maker",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  // next();
});

export default app;
