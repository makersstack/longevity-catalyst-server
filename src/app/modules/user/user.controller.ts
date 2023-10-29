/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserSkillService } from "./user-skills/skills.service";
import { IResponse, IUser } from "./user.interface";
import { userService } from "./user.services";

// Create a new user
const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const user = await userService.createUser(userData);
    const modifyData = user.dataValues;

    const { password, ...userDetails } = modifyData;

    await UserSkillService.createUserSkill(userDetails.id, "Default Skill");

    sendResponse<IResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
  }
});

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
