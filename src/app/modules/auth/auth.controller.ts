import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { utilities } from "../../../helpers/utilities";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload: ILoginUser = req.body;

  const result = await AuthService.loginUser(payload);

  const { refreshToken, ...others } = result;

  // set access token into cookie
  const cookieOptions = {
    httpOnly: true,
    secure: config.env === "production",
    // sameSite: 'None',
    path: "/",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  const result = await AuthService.refreshToken(refreshToken);

  // const cookieOptions = {
  //   secure: config.env === "production",
  //   httpOnly: true,
  // };

  // res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token successfully extended!",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const passData = req.body;
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

  if (!passData) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "NOT_ACCEPTABLE");
  }
  const getId = token;
  const userId = Number(getId);
  const result = await AuthService.changePassword(userId, passData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password change successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
