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

export const userService = {
  createUser,
};
