import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { likeService } from "./like.services";

const projectLikeOperation = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found!");
  }

  const operationData = req.body;

  const result = await likeService.projectLikeOperation(token, operationData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successfully",
    data: result,
  });
});

const getAllLikesByPost = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const getLikes = await likeService.getAllLikesByPost(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrieved successfully",
    data: getLikes,
  });
});

const getAllLikesByUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const getLikes = await likeService.getAllLikesByUser(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrieved successfully",
    data: getLikes,
  });
});

export const likeController = {
  getAllLikesByPost,
  getAllLikesByUser,
  projectLikeOperation,
};
