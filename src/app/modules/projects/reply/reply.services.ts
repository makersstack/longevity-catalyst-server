/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { paginationHelpers } from "../../../../helpers/paginationHelpers";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import Reply from "./reply.model";

const createReply = async (
  token: string,
  projectId: number,
  commentId: number,
  replyText: string
) => {
  if (!token || !replyText || !projectId || !commentId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  // const checkProject = await Project.findByPk(projectId);
  // const checkComment = await Comment.findByPk(projectId);

  // if (!checkProject || !checkComment) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     "Comment && project are not found"
  //   );
  // }
  const createReply = await Reply.create({
    userId,
    projectId,
    commentId,
    replyText,
    createdAt: new Date(),
  });

  const user = await User.findByPk(userId, {
    attributes: ["id", "full_name", "username", "email", "profileImage"],
  });

  // Append user data to the comment object
  const replyWithUserData = {
    ...createReply.toJSON(),
    User: user,
  };

  return replyWithUserData as Reply;
};

const updateReply = async (
  token: string,
  replyId: number,
  replyText: string
) => {
  if (!token || !replyId || !replyText) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const replyToUpdate = await Reply.findByPk(replyId, {
    include: [
      {
        model: User,
        attributes: ["id", "full_name", "username", "email", "profileImage"],
      },
    ],
  });

  if (!replyToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reply not found");
  }

  if (replyToUpdate.userId !== userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this comment"
    );
  }

  replyToUpdate.replyText = replyText || replyToUpdate.replyText;

  replyToUpdate.updatedAt = new Date();

  await replyToUpdate.save();

  return replyToUpdate;
};

const deleteReply = async (token: string, replyId: number) => {
  const userId = utilities.getUserIdByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const replay = await Reply.findOne({ where: { id: replyId } });

  if (!replay) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reply not found");
  }

  if (replay.userId !== userId) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "Forbidden: You do not have permission to delete this replay"
    );
  }

  await replay.destroy();

  return replay;
};

const getSingleProject = async (projectId: string) => {
  return Reply.findByPk(Number(projectId));
};

const getAllReplyByComment = async (
  commentId: number,
  paginationOptions: any
) => {
  if (!commentId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment are not found");
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      commentId: commentId,
    },
    offset: skip,
    limit,
    order: [] as [string, string][],
    include: [
      {
        model: User,
        attributes: ["id", "full_name", "username", "email", "profileImage"],
      },
    ],
    distinct: true,
    subQuery: false,
  };
  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }
  const result = await Reply.findAndCountAll(options);
  const total = result.count;

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result.rows,
  };
  return responseData;
};

export const replyService = {
  createReply,
  getSingleProject,
  updateReply,
  deleteReply,
  getAllReplyByComment,
};
