// user-skill.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Skill } from "./skills.model";
import { skillServices } from "./skills.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const { skillName } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const userSkill = await skillServices.createSkill(skillName);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill Create Successfull",
    data: userSkill,
  });
});

const getAllSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await skillServices.getAllSkill();

  sendResponse<Skill[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

export const skillController = {
  createSkill,
  getAllSkill,
};
