import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { VoteService } from "./vote.services";

const createOrRemoveVote = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
  }

  const postId = req.params;

  const result = await VoteService.createOrRemoveVote(token, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getAllVoteByPost = catchAsync(async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const getLikes = await VoteService.getAllVoteByPost(projectId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrieved successfully",
    data: getLikes,
  });
});

const getAllVoteByUser = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry");
  }

  const getLikes = await VoteService.getAllVoteByUser(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "retrieved successfully",
    data: getLikes,
  });
});

// project like operation
const projectVoteOperation = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "UNAUTHORIZED");
  }

  const operationData = req.body;

  const result = await VoteService.createOrRemoveVote(token, operationData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Operation successfully",
    data: result,
  });
});

export const VoteController = {
  createOrRemoveVote,
  getAllVoteByPost,
  getAllVoteByUser,
  projectVoteOperation,
};
