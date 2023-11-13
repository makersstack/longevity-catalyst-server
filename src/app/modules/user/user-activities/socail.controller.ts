import { Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../../config";
import ApiError from "../../../../errors/ApiError";
import { jwtHelpers } from "../../../../helpers/jwtHelpers";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { IUserSocailInterface } from "./socail.interface";
import { userSocailServices } from "./socail.services";

const createSocailLinks = catchAsync(async (req: Request, res: Response) => {
  const { socailLinks } = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  console.log("Here is token", token);
  const varifyedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const { userId } = varifyedToken;
  const userSocial = await userSocailServices.createSocailLinks(
    userId,
    socailLinks
  );

  sendResponse<IUserSocailInterface>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Socail Link added",
    data: userSocial,
  });
});

export const userSocailController = {
  createSocailLinks,
};
