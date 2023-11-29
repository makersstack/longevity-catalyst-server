import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { commentService } from "./comments.services";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const projectId = Number(req.params.projectId);
  const { commentText } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const result = await commentService.createComment(
    token,
    projectId,
    commentText
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment Created successfully!",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentText } = req.body;
  const commentId = Number(req.params.commentId);
  const projectId = Number(req.params.projectId);
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const updatedProject = await commentService.updateComment(
    token,
    projectId,
    commentId,
    commentText
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project Data Update successfully!",
    data: updatedProject,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = Number(req.params.commentId);
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are unauthorized");
  }
  const deletedComment = await commentService.deleteComment(token, commentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment delete successfully",
    data: deletedComment,
  });
});

const getAllCommentByProject = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = req.body;
    const projectId = Number(req.params.projectId);

    const comments = await commentService.getAllCommentByProject(
      projectId,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comments Rettrif successfylly",
      data: comments,
    });
  }
);

export const commentController = {
  createComment,
  updateComment,
  deleteComment,
  getAllCommentByProject,
};
