import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../../config";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import { utilities } from "../../../../helpers/utilities";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { UserDetailsInterface } from "./userDetails.interface";
import { userDetailsServices } from "./userDetails.services";

const createUserDetails = catchAsync(async (req: Request, res: Response) => {
  const { socailLinks } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const varifyedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const { userId } = varifyedToken;
  const userSocial = await userDetailsServices.createUserDetails(
    userId,
    socailLinks
  );

  sendResponse<UserDetailsInterface>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Socail Link added",
    data: userSocial,
  });
});

const getAllUserDetails = catchAsync(async (req: Request, res: Response) => {
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
  const users = await userDetailsServices.getAllUserDetails();

  sendResponse<UserDetailsInterface[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

export const userDetailsController = {
  createUserDetails,
  getAllUserDetails,
};
