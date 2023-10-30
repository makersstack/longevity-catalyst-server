import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Op, Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (
  userData: Optional<IUser, NullishPropertiesOf<IUser>> | undefined
) => {
  if (!userData?.password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Password is required to create a user"
    );
  }

  // Check if the username or email is already in use
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: userData.username }, { email: userData.email }],
    },
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Username or email is already in use"
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.password = hashedPassword;

  const user = await User.create(userData);

  return user;
};

// For all users
const getUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
};

// For Single User
const getUserByUserName = async (username: string) => {
  const user = await User.findOne({
    where: { username: username },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new Error("User Not Found");
  }

  return user;
};

export const userService = {
  createUser,
  getUsers,
  getUserByUserName,
};
