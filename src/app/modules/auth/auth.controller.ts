import { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import { AuthService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const payload: ILoginUser = req.body;

  const result = await AuthService.loginUser(payload);
  const { accessToken } = result;

  // set access token into cookie
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("accessToken", accessToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: result,
  });
};

const refreshToken = async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;

  const result = await AuthService.refreshToken(accessToken);

  // Set the new access token into a cookie
  const newAccessToken = result.accessToken;
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("accessToken", newAccessToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "Refresh token successfully extended!",
    data: result,
  });
};

export const AuthController = {
  loginUser,
  refreshToken,
};
