/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { UserSkillService } from "./user-skills/skills.service";
import { IResponse, IUser } from "./user.interface";
import { userService } from "./user.services";

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    const user = await userService.createUser(userData);
    const modifyData = user.dataValues;

    const { password, ...userWithoutPassword } = modifyData;

    await UserSkillService.createUserSkill(
      userWithoutPassword.id,
      "Default Skill"
    );

    sendResponse<IResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully!",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all users
const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
};

// For Single users
const getUserByUserName = async (req: Request, res: Response) => {
  const username = req.params.username;
  const userDetails = await userService.getUserByUserName(username);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: userDetails,
  });
};

export const UserController = {
  createUser,
  getUsers,
  getUserByUserName,
};
