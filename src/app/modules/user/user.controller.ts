/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import cloudinary from "../../../config/cloudinary";
import ApiError from "../../../errors/ApiError";
import { utilities } from "../../../helpers/utilities";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IResponse } from "./user.interface";
import { userService } from "./user.services";

// Create a new user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    if (req.file) {
      // @ts-ignore
      cloudinary.uploader.upload(req.file?.path, async function (err, result) {
        if (err || !result) {
          return res.status(500).json({
            success: false,
            message: "Error uploading image",
          });
        }
        userData.profileImage = result.secure_url;

        const userAllData = await userService.createUser(userData);

        // sendResponse<IResponse>(res, {
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User created successfully!",
          data: userAllData,
        });
      });
    } else {
      const result = await userService.createUser(userData);

      if (!result) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "This error for controller get null"
        );
      }
      const { password, ...userAllInfo } = result;

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: true,
      });
    }
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userName = String(req.params.username);
    const updateData = req.body;
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized access. Please log in."
      );
    }
    const id = utilities.getUserIdByToken(token);

    if (req.file) {
      // @ts-ignore
      cloudinary.uploader.upload(req.file?.path, async function (err, result) {
        if (err || !result) {
          return res.status(500).json({
            success: false,
            message: "Error uploading image",
          });
        }
        updateData.profileImage = result.secure_url;

        const userDetails = await userService.updateUser(
          userName,
          updateData,
          id
        );
        const { password, ...userData } = userDetails;

        sendResponse<IResponse>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User created successfully!",
          data: userData,
        });
      });
    } else {
      const userDetails = await userService.updateUser(
        userName,
        updateData,
        id
      );

      if (!userDetails) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User data not updated");
      }
      const { password, ...userData } = userDetails;

      sendResponse<IResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users Update successfully",
        data: userData,
      });
    }
  }
);
// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized access. Please log in."
    );
  }
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
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
  // const userName = req.params.username;

  const token = req.headers.authorization;
  const userName = String(req.params.username);
  if (!userName) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }
  let userToken;

  if (!token) {
    userToken = null;
  } else {
    userToken = token;
  }

  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new ApiError(
  //     httpStatus.UNAUTHORIZED,
  //     "Unauthorized access. Please log in."
  //   );
  // }
  // const isAuthorized = utilities.verifiedTokenAndDb(token);
  // if (!isAuthorized) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  // }

  const userDetails = await userService.getUserByUserName(userName, userToken);

  sendResponse<IResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: userDetails,
  });
});

const getUserInfoById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const convertId = Number(userId);

  const result = await userService.getUserInfoById(convertId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrif successful",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const convertId = Number(userId);

  const result = await userService.deleteUser(convertId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrif successful",
    data: result,
  });
});

const userSubscriBing = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(httpStatus.NOT_FOUND, "Email not set");
  }

  const result = await userService.userSubscriBing(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscribing successful",
    data: result,
  });
});

export const UserController = {
  createUser,
  updateUser,
  getAllUsers,
  getUserByUserName,
  getUserInfoById,
  deleteUser,
  userSubscriBing,
};
