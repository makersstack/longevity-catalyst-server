import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../../config";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { userSkillServices } from "./user-skill.services";

const createUserSkill = catchAsync(async (req: Request, res: Response) => {
  const { skillId } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const varifyedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const { userId } = varifyedToken;

  const userSkill = await userSkillServices.createUserSkill(userId, skillId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill Create Successfull",
    data: userSkill,
  });
});

export const userSkillController = {
  createUserSkill,
};
