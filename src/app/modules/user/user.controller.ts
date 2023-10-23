/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { IResponse, IUser } from "./user.interface";
import { User } from "./user.model";
import { userService } from "./user.services";

// Create a new user
const createUser = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const user = await userService.createUser(userData);
  const modifyData = user.dataValues;

  const { password, ...userWithoutPassword } = modifyData;

  sendResponse<IResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: userWithoutPassword,
  });
};

// Get all users
async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export const UserController = {
  createUser,
  getUsers,
};
