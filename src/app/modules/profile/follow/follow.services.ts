/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import { ProfileFollow } from "./follow.model";

const followOperation = async (token: string, operationData: any) => {
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found!");
  }

  const userInfo = (await utilities.tokenToUserInfo(token)) as any;

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { username, status } = operationData;

  const user = await User.findOne({
    attributes: ["id"],
    where: { username: username },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const { id } = userInfo;
  const followData = {
    follow_by: id,
    follow_to: user.id,
  };

  const existingFollow = await ProfileFollow.findOne({
    where: followData,
  });

  if (status) {
    if (!existingFollow) {
      await ProfileFollow.create(followData);
    }
  } else {
    if (existingFollow) {
      await ProfileFollow.destroy({
        where: followData,
      });
    }
  }

  return existingFollow;
};

export const followService = {
  followOperation,
};
