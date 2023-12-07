/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { utilities } from "../../../../helpers/utilities";
import Comment from "../comments/comments.model";
import { Project } from "../project.model";
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
  const checkProject = await Project.findByPk(projectId);
  const checkComment = await Comment.findByPk(projectId);

  if (!checkProject || !checkComment) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Comment && project are not found"
    );
  }
  const createReply = await Reply.create({
    userId,
    projectId,
    commentId,
    replyText,
    createdAt: new Date(),
  });

  return createReply.toJSON() as Reply;
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

export const replyService = {
  createReply,
  getSingleProject,
  updateReply,
  deleteReply,
};
