/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import handaleCastError from "../../errors/handaleCastError";
import { IGenericErrorMessage } from "../../interfaces/error.interface";
import { errorlogger } from "../../shared/logger";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env == "development"
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "CastError") {
    const simplifiedError = handaleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    if (error.name === "TokenExpiredError") {
      statusCode = httpStatus.UNAUTHORIZED;
      message = "Forbidden - Token Expired";
      errorMessages = [
        {
          path: "JWT",
          message: "Token has expired. Please refresh your token.",
        },
      ];
    } else {
      message = error?.message;
      errorMessages = error?.message
        ? [
            {
              path: "",
              message: error?.message,
            },
          ]
        : [];
    }
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: undefined,
    // stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
