import { Secret } from "jsonwebtoken";
import { User } from "../app/modules/user/user.model";
import config from "../config";
import { jwtHelpers } from "./jwtHelpers";

const verifyUserByDb = async (userId: number): Promise<boolean> => {
  const user = await User.findOne({ where: { id: userId } });
  return !!user;
};

const verifiedTokenAndDb = async (token: string): Promise<boolean> => {
  const userId = getUserIdByToken(token);
  if (userId) {
    await verifyUserByDb(userId);
    return true;
  }
  return false;
};

const getUserIdByToken = (token: string) => {
  const verifiedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  const { userId } = verifiedToken;
  return userId;
};
const getUserRoleByToken = (token: string) => {
  const verifiedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  // console.log(verifiedToken);

  const { role } = verifiedToken;

  return role;
};

const tokenToUserInfo = async (token: string) => {
  if (token) {
    const userId = getUserIdByToken(token);

    const userInfo = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    return userInfo;
  } else {
    return false;
  }
};

const generateUniqueCode = (): string => {
  const codeLength = 10;
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

export const utilities = {
  verifyUserByDb,
  getUserIdByToken,
  getUserRoleByToken,
  verifiedTokenAndDb,
  tokenToUserInfo,
  generateUniqueCode,
};
