import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFileds } from "../../../../constants/pagination";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import pick from "../../../../shared/pick";
import sendResponse from "../../../../shared/sendResponse";
import { commentService } from "./comments.services";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const projectId = Number(req.params.projectId);
  const { commentText } = req.body;

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
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const updatedProject = await commentService.updateComment(
    token,
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
    const paginationOptions = pick(req.query, paginationFileds);
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
