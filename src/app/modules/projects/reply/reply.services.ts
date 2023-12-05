/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { paginationHelpers } from "../../../../helpers/paginationHelpers";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import Comment from "../comments/comments.model";
import { Project } from "../project.model";
import Reply from "./reply.model";

const createReply = async (
  token: string,
  replyText: string,
  projectId: number,
  commentId: number
) => {
  if (!token || !replyText || !projectId || !projectId || !commentId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const checkProject = await Project.findByPk(projectId);
  const checkComment = await Comment.findByPk(projectId);

  if (!checkProject || !checkComment) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Comment && project are not found"
    );
  }
  const createReply = await Comment.create({
    userId,
    projectId,
    commentId,
    replyText,
    createdAt: new Date(),
  });

  return createReply;
};

const updateReply = async (
  token: string,
  projectId: number,
  commentId: number,
  replyId: number,
  replyText: string
) => {
  if (!token || !projectId || !commentId || !replyId || !replyText) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const replyToUpdate = await Reply.findByPk(replyId);
  if (!replyToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Reply not found");
  }

  if (
    replyToUpdate.userId !== userId ||
    replyToUpdate.projectId !== projectId ||
    replyToUpdate.commentId !== commentId
  ) {
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
  const result = await Comment.findOne({ where: { id: replyId } });

  if (result) {
    await result.destroy();
    return result;
  }

  return null;
};

const getSingleProject = async (projectId: string) => {
  return Reply.findByPk(Number(projectId));
};

const getAllReplyByComment = async (
  commentId: number,
  projectId: number,
  paginationOptions: any
) => {
  if (!projectId || !commentId) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project are not found");
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const options = {
    where: {
      projectId: projectId,
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
  };

  if (sortBy && sortOrder) {
    options.order.push([sortBy, sortOrder]);
  }

  const result = await Comment.findAndCountAll(options);
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
