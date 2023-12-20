import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  id: number;
  email: string;
  username: string;
  password: string;
  identifier: object;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
