import { UserDetailsInterface } from "./userDetails.interface";
import { UserDetails } from "./userDetails.model";

const createUserDetails = async (userId: number, socailLinks: string[]) => {
  if (socailLinks.length === 0) {
    socailLinks.push("Default Skill");
  }
  const userSocailData = {
    userId,
    socailLinks,
  };
  const userSocailInstance = await UserDetails.create(userSocailData);
  const userSocailPlainData =
    userSocailInstance.toJSON() as UserDetailsInterface;
  return userSocailPlainData;
};

const getAllUserDetails = async (): Promise<UserDetailsInterface[] | null> => {
  const userDeti = await UserDetails.findAll();

  const userArray: UserDetailsInterface[] = userDeti.map((user) => {
    const { ...rest } = user.toJSON();
    return { ...rest } as UserDetailsInterface;
  });

  return userArray;
};

export const userDetailsServices = {
  createUserDetails,
  getAllUserDetails,
};
