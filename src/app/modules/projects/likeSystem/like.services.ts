/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import { LikeModel } from "./like.model";

const createOrRemoveLike = async (token: string, postId: any) => {
  const userInfo = jwtHelpers.getUserInfoByToken(token);
  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
  }

  const { userId, role } = userInfo;
  if (!userId || !postId || !role) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error creating like");
  }

  // Checking for like
  const existingLike = await LikeModel.findOne({ where: { userId, postId } });

  if (existingLike) {
    await LikeModel.destroy();
    return false;
  } else {
    const likeData = {
      userId,
      postId,
    };
    await LikeModel.create(likeData);

    return likeData;
  }
};

const getAllLikesByPost = async (projectId: any) => {
  const result = await LikeModel.findAll({
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

  const result = await LikeModel.findAll({
    where: { userId },
  });

  return result;
};

export const likeService = {
  createOrRemoveLike,
  getAllLikesByPost,
  getAllLikesByUser,
};
