import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (
  userData: Optional<IUser, NullishPropertiesOf<IUser>> | undefined
) => {
  try {
    const user = await User.create(userData);

    return user;
  } catch (error) {
    throw new Error("Failed to create user");
  }
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
    where: { name: username },
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
