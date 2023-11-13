import { UserSocailInterface } from "./socail.interface";
import { UserSocail } from "./socail.modle";

const createSocailLinks = async (userId: number, socailLinks: string[]) => {
  if (socailLinks.length === 0) {
    socailLinks.push("Default Skill");
  }
  const userSocailData = {
    userId,
    socailLinks,
  };
  const userSocailInstance = await UserSocail.create(userSocailData);
  const userSocailPlainData =
    userSocailInstance.toJSON() as UserSocailInterface;
  return userSocailPlainData;
};

export const userSocailServices = {
  createSocailLinks,
};
