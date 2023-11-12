import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { likeService } from "./like.services";

const createOrRemoveLike = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry");
  }

  const postId = req.params;

  const result = await likeService.createOrRemoveLike(token, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
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
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry");
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
  createOrRemoveLike,
  getAllLikesByPost,
  getAllLikesByUser,
};
