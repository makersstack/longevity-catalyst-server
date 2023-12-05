/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import { utilities } from "../../../../helpers/utilities";
import { ProjectLike } from "../likeSystem/like.model";
import { ProjectVote } from "./vote.model";

const createOrRemoveVote = async (token: string, operationData: any) => {
  const isAuthorized = utilities.verifiedTokenAndDb(token);
  if (!isAuthorized) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
  }

  const userInfo = (await utilities.tokenToUserInfo(token)) as any;

  if (!userInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const { projectId, voteType, status } = operationData;

  const { id } = userInfo;
  const voteData = {
    authorId: id,
    project_id: projectId,
    voteType: voteType,
  };

  const existingVote = await ProjectVote.findOne({
    where: voteData,
  });

  if (status) {
    if (!existingVote) {
      await ProjectVote.destroy({
        where: {
          project_id: projectId,
          authorId: id,
        },
      });
      await ProjectVote.create(voteData);
    }
  } else {
    if (existingVote) {
      await ProjectVote.destroy({
        where: voteData,
      });
    }
  }

  // project current vote count
  const upVote = await ProjectVote.count({
    where: {
      voteType: "up",
      project_id: projectId,
    },
  });
  const downVote = await ProjectVote.count({
    where: {
      voteType: "down",
      project_id: projectId,
    },
  });
  const voteCounts = {
    total: upVote + downVote,
    up: upVote,
    down: downVote,
  };

  return voteCounts;
};

const getAllVoteByPost = async (projectId: any) => {
  const result = await ProjectLike.findAll({
    where: { likedItemId: projectId },
  });

  return result;
};

const getAllVoteByUser = async (token: string) => {
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

export const VoteService = {
  createOrRemoveVote,
  getAllVoteByPost,
  getAllVoteByUser,
};
