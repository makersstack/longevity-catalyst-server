/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { Op } from "sequelize";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";

import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { identifier, password } = payload;
  if (!identifier) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid username or password");
  }

  // Check if the user exists by email or username
  const user = await User.findOne({
    attributes: ["id", "role", "password"],
    where: {
      [Op.or]: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid username or password`);
  }

  // Verify the password
  const isPasswordValid = await user.isPasswordMatch(
    password,
    user.getDataValue("password")
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid username or password");
  }

  const { id: userId, role: userRole } = user as any;

  const accessToken = jwtHelpers.createToken(
    { userId, userRole },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, userRole },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // Verify the refresh token
  let verifiedToken: any;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid Refresh Token");
  }

  const { userId } = verifiedToken;

  // Check if the user exists
  const isUserExist = await User.findByPk(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Generate a new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      userId: (isUserExist as any).id,
      userRole: (isUserExist as any).userRole,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (userId: number, passData: IChangePassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Verify the old password
  const isPasswordValid = await bcrypt.compare(
    passData.oldPassword,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }

  if (passData.oldPassword === passData.newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old password is incorrect");
  }

  // Hash the new password before updating
  const hashedNewPassword = await bcrypt.hash(
    passData.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  user.password = hashedNewPassword;

  await user.save();
  return true;
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
