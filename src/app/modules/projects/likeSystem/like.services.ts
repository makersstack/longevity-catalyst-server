/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import { utilities } from "../../../../helpers/utilities";
import { ProjectLike } from "./like.model";

const createOrRemoveLike = async (token: string, operationData: any) => {
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }

  const userInfo = (await utilities.tokenToUserInfo(token)) as any;

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { projectId, status } = operationData;

  const { id } = userInfo;
  const likeData = {
    authorId: id,
    project_id: projectId,
  };

  const existingLike = await ProjectLike.findOne({
    where: likeData,
  });

  if (status) {
    if (!existingLike) {
      await ProjectLike.create(likeData);
    }
  } else {
    if (existingLike) {
      await ProjectLike.destroy({
        where: likeData,
      });
    }
  }

  return existingLike;
};

const getAllLikesByPost = async (projectId: any) => {
  const result = await ProjectLike.findAll({
    where: { likedItemId: projectId },
  });

  return result;
};

const getAllLikesByUser = async (token: string) => {
  const userInfo = jwtHelpers.getUserInfoByToken(token);
  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
  }

  const { userId, role } = userInfo;
  if (!userId || !role) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User are no likes");
  }

  const result = await ProjectLike.findAll({
    where: { userId },
  });

  return result;
};

export const likeService = {
  createOrRemoveLike,
  getAllLikesByPost,
  getAllLikesByUser,
};
