import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Check which user are permited", requiredRoles);
      // Get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      console.log(token);
      // Verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );
      console.log("Check user", verifiedUser);

      // Check if verifiedUser is not null
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      console.log("For lentch check", requiredRoles.length);
      console.log("For role check", verifiedUser.role);
      // Role-based authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Forbidden For Maker");
      }

      req.user = verifiedUser;
      console.log("Check last user", verifiedUser);
      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
