import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import { errorlogger } from "../shared/logger";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const getUserInfoByToken = (token: string) => {
  try {
    const payload = verifyToken(token, config.jwt.refresh_secret as Secret);
    return payload;
  } catch (error) {
    errorlogger.error(error);
  }
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  getUserInfoByToken,
};
