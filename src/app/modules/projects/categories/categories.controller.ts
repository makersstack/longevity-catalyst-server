/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { CategoriesService } from "./categories.services";

const getAllCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if (!token) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    // }

    // const isAuthorized = utilities.verifiedTokenAndDb(token);
    // if (!isAuthorized) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized!");
    // }

    const result = await CategoriesService.getAllCategories();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Here is the all categories",
      data: result,
    });
  }
);

export const categoryController = {
  getAllCategories,
};
