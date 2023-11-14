import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Op } from "sequelize";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: IUser): Promise<IUser | null> => {
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

  if (userData.profileImage) {
    console.log("Image Id response");
  }

  const user = await User.create(userData);
  const userPlainData = user.toJSON() as IUser;
  return userPlainData;
};

// For all users
const getAllUsers = async (): Promise<IUser[] | null> => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  const userArray: IUser[] = users.map((user) => {
    const { id, full_name, username, role, ...rest } = user.toJSON();
    return { id, full_name, username, role, ...rest } as IUser;
  });

  return userArray;
};

// For Update User
const updateUser = async (
  username: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
  }
  user.set(updateData);

  await user.save();

  const updatedUserPlainData = user.toJSON() as IUser;
  return updatedUserPlainData;
};

// For Single User
const getUserByUserName = async (userName: string): Promise<IUser | null> => {
  const user = await User.findOne({
    where: { username: userName },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Not Found");
  }
  const userPlainData = user.toJSON() as IUser;
  return userPlainData;
};

export const userService = {
  createUser,
  updateUser,
  getAllUsers,
  getUserByUserName,
};
