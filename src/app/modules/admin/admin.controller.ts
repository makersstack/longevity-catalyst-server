/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AdminResponse } from "./admin.interface";
import { adminServices } from "./admin.services";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body;
  const result = await adminServices.createAdmin(adminData);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Solve the issu");
  }
  const { password, ...othersData } = result;

  sendResponse<AdminResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created Successfully",
    data: othersData,
  });
});

export const adminController = {
  createAdmin,
};
