import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
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

  const result = await AuthService.refreshToken(refreshToken);

  // const cookieOptions = {
  //   secure: config.env === "production",
  //   httpOnly: true,
  // };

  // res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "Access token successfully extended!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
