import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../../errors/ApiError";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { followService } from "./follow.services";

const profileFollowOperation = catchAsync(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not found!");
    }

    const operationData = req.body;

    const result = await followService.followOperation(token, operationData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Operation successfully",
      data: result,
    });
  }
);

export const followController = {
  profileFollowOperation,
};
