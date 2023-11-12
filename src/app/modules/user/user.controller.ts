/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { userService } from "./user.services";

// Create a new user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;

      const user = await userService.createUser(userData);

      const modifyData = user.dataValues;

      const userDetails = (({ password, ...rest }) => rest)(modifyData);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: userDetails,
      });
    } catch (error) {
      throw new ApiError(httpStatus.BAD_GATEWAY, `${error}:`);
    }
  }
);

// Get all users
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// For Single users
const getUserByUserName = catchAsync(async (req: Request, res: Response) => {
  const username = req.params.username;
  const userDetails = await userService.getUserByUserName(username);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: userDetails,
  });
});

export const UserController = {
  createUser,
  getUsers,
  getUserByUserName,
};
