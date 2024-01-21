/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import { ProfileNotify } from "./notification.model";

const notificationOperation = async (token: string, operationData: any) => {
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
  const notifyData = {
    notify_by: id,
    notify_to: user.id,
  };

  const existingNotify = await ProfileNotify.findOne({
    where: notifyData,
  });

  if (status) {
    if (existingNotify === null) {
      await ProfileNotify.create(notifyData, {
        returning: true,
        plain: true,
      });
    }
  } else {
    if (existingNotify !== null) {
      await ProfileNotify.destroy({
        where: notifyData,
      });
    }
  }

  return;
};

export const notificationService = {
  notificationOperation,
};
