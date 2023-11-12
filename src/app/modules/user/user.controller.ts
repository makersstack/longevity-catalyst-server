/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IResponse, IUser } from "./user.interface";
import { userService } from "./user.services";

// Create a new user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData: IUser = req.body;

    const result = await userService.createUser(userData);

    if (!result) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "This error for controller get null"
      );
    }

    const { password, ...otersData } = result;

    sendResponse<IResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: otersData,
    });
  }
);
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userName = req.params.username;
  const updateData = req.body;
  const userDetails = await userService.updateUser(userName, updateData);

  if (!userDetails) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User data not updated");
  }
  const { password, ...userData } = userDetails;

  sendResponse<IResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: userData,
  });
});
// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  sendResponse<IResponse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// For Single users
const getUserByUserName = catchAsync(async (req: Request, res: Response) => {
  const userName = req.params.username;
  const userDetails = await userService.getUserByUserName(userName);

  sendResponse<IResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: userDetails,
  });
});

export const UserController = {
  createUser,
  updateUser,
  getAllUsers,
  getUserByUserName,
};
