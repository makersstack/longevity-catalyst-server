/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import { paginationHelpers } from "../../../../helpers/paginationHelpers";
import { utilities } from "../../../../helpers/utilities";
import { User } from "../../user/user.model";
import { Project } from "../project.model";
import Comment from "./comments.model";

const createComment = async (
  token: string,
  projectId: number,
  commentText: string
): Promise<Comment | null> => {
  if (!token || !commentText || !projectId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const checkProject = await Project.findByPk(projectId);

  if (!checkProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  const createdComment = await Comment.create({
    userId,
    projectId,
    commentText,
    createdAt: new Date(),
  });

  return createdComment.toJSON() as Comment;
};

const updateComment = async (
  token: string,
  projectId: number,
  commentId: number,
  commentText: string
) => {
  if (!token || !commentId || !commentText || !projectId) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Invalid input data");
  }
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const commentToUpdate = await Comment.findByPk(commentId);

  if (!commentToUpdate) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
  }

  if (commentToUpdate.projectId !== projectId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this comment"
    );
  }

  if (commentToUpdate.userId !== userId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not allowed to update this comment"
    );
  }

  commentToUpdate.commentText = commentText || commentToUpdate.commentText;
  commentToUpdate.updatedAt = new Date();

  await commentToUpdate.save();

  return commentToUpdate;
};

const deleteComment = async (token: string, commentId: number) => {
  const userId = utilities.getUserIdByToken(token);

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const result = await Comment.findOne({ where: { id: commentId } });

  if (result) {
    await result.destroy();
    return result;
  }
  return null;
};

const getAllCommentByProject = async (
  projectId: number,
  paginationOptions: any
) => {
  if (!projectId) {
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

export const commentService = {
  createComment,
  getAllCommentByProject,
  updateComment,
  deleteComment,
};
