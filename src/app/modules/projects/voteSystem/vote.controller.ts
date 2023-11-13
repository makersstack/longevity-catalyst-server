import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { voteService } from "./vote.services";

const createOrRemoveVote = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const projectId: number = Number(req.params.projectId);
  const voteType: "up" | "down" = req.body;

  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Sorry");
  }

  const result = await voteService.createOrRemoveVote({
    token,
    projectId,
    voteType,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getVotebyProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectid = Number(req.params.projectId);
    const result = await voteService.getVoteByProject(projectid);

    sendResponse(res, {
      statusCode: result ? 200 : 400,
      success: result ? true : false,
      message: result ? "Here is project votes" : "Project not found",
      data: result,
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
});

const getVotebyUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry");
    }
    const result = await voteService.getVotebyUser(token);

    sendResponse(res, {
      statusCode: result ? 200 : 400,
      success: result ? true : false,
      message: result ? "Here is project votes" : "Project not found",
      data: result,
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
});

export const voteController = {
  createOrRemoveVote,
  getVotebyProject,
  getVotebyUser,
};
