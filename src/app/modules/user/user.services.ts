/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Op } from "sequelize";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { utilities } from "../../../helpers/utilities";
import { ProfileFollow } from "../profile/follow/follow.model";
import { ProfileNotify } from "../profile/notification/notification.model";
import { Skill } from "../skills/skills.model";
import { UserDetailsInterface } from "./user-details/userDetails.interface";
import { UserDetails } from "./user-details/userDetails.model";
import { UserSkill } from "./user-skill/user-skills.model";
import { IResponse, ISubscribing, IUser, Subscribing } from "./user.interface";
import { SubscriBing, User } from "./user.model";

const createUser = async (userData: any): Promise<any> => {
  // Check if the username or email is already in use
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ username: userData.username }, { email: userData.email }],
    },
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Username or email is already in use"
    );
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.password = hashedPassword;

  const user = await User.create(userData, {
    returning: true,
    plain: true,
    attributes: { exclude: ["password"] },
  });
  if (user) {
    await UserDetails.create({ userId: user.id, ...userData });
  }

  return true;
};

// For all users
const getAllUsers = async (): Promise<IUser[] | null> => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  const userArray: IUser[] = users.map((user) => {
    const { id, full_name, username, role, ...rest } = user.toJSON();
    return { id, full_name, username, role, ...rest } as IUser;
  });

  return userArray;
};

// For Update User
const updateUser = async (
  username: string,
  updateData: any,
  id: number
): Promise<any> => {
  const user = await User.findOne({
    where: { username },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (id !== user.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Mismatching user");
  }
  let userDetails = await UserDetails.findOne({
    where: { userId: id },
  });
  if (!userDetails) {
    userDetails = UserDetails.build({ userId: id });
  }

  const allowedFields: Array<keyof IResponse> = ["full_name", "profileImage"];

  const allowedDetailsFields: Array<keyof UserDetailsInterface> = [
    "lives_in",
    "home_state",
    "github",
    "portfolio",
    "company",
    "bio",
  ];
  // console.log(updateData);
  if (typeof updateData === "object" && updateData !== null) {
    for (const field of allowedFields) {
      if (field in updateData) {
        (user as any)[field] = updateData[field];
      }
    }
    for (const field of allowedDetailsFields) {
      if (field in updateData) {
        (userDetails as any)[field] = updateData[field];
      }
    }
  }
  const { skills } = updateData;
  const skillsArray = JSON.parse(skills);

  // Fetch existing skills
  const existingSkills = await UserSkill.findAll({
    where: { userId: id },
    attributes: ["skillId"],
  });
  // console.log(existingSkills.skillId);

  const existingSkillsArray = existingSkills.map((skill) => skill.skillId);

  // Identify skills to be added and deleted
  const skillsToAdd = skillsArray.filter(
    (skill: any) => !existingSkillsArray.includes(skill)
  );
  const skillsToDelete = existingSkillsArray.filter(
    (skill) => !skillsArray.includes(skill)
  );

  // Delete skills
  await UserSkill.destroy({
    where: { userId: id, skillId: skillsToDelete },
  });

  // Add new skills
  await UserSkill.bulkCreate(
    skillsToAdd.map((skill: any) => ({ userId: id, skillId: skill }))
  );

  await user.save();
  await userDetails.save();
  await user.reload({
    include: [
      {
        model: UserDetails,
        attributes: { exclude: ["createdAt", "updatedAt", "id", "userId"] },
      },
      {
        model: Skill,
        through: {
          attributes: [], // Exclude the join table attributes if needed
        },
      },
    ],
  });

  const updatedUserPlainData = user.toJSON() as IResponse;
  return updatedUserPlainData;
};

// For Single User
const getUserByUserName = async (
  userName: string,
  userToken: string | null
): Promise<IUser | null | any> => {
  const user = await User.findOne({
    where: { username: userName },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: UserDetails,
        attributes: { exclude: ["createdAt", "updatedAt", "id", "userId"] },
      },
      {
        model: Skill,
        through: {
          attributes: [], // Exclude the join table attributes if needed
        },
      },
    ],
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Not Found");
  }
  let isNotify = false;
  let isFollow = false;
  if (userToken !== null) {
    const userInfo = (await utilities.tokenToUserInfo(userToken)) as any;
    const NotifyCount = await ProfileNotify.count({
      where: { notify_by: userInfo.id, notify_to: user.id },
    });
    if (NotifyCount > 0) {
      isNotify = true;
    }
    const FollowCount = await ProfileFollow.count({
      where: { follow_by: userInfo.id, follow_to: user.id },
    });
    if (FollowCount > 0) {
      isFollow = true;
    }
  }
  const followerCount = await ProfileFollow.count({
    where: { follow_to: user.id },
  });
  const followingCount = await ProfileFollow.count({
    where: { follow_by: user.id },
  });

  const userPlainData = user.toJSON() as IUser;
  return {
    ...userPlainData,
    isNotify,
    isFollow,
    followerCount,
    followingCount,
    content_view_count: 0,
  };
  // return userPlainData;
};

const getUserInfoById = async (userId: number): Promise<IUser | null> => {
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const findUser = await User.findByPk(userId, {
    attributes: {
      exclude: ["createdAt", "updatedAt", "password"],
    },
    include: [
      {
        model: UserDetails,
        attributes: { exclude: ["createdAt", "updatedAt", "id", "userId"] },
      },
      {
        model: Skill,
        through: {
          attributes: [], // Exclude the join table attributes if needed
        },
      },
    ],
  });

  if (!findUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const result = findUser.toJSON() as IUser & {
    UserDetails: UserDetailsInterface;
  };
  return result;
};

const deleteUser = async (userId: number): Promise<IUser | null> => {
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const findUser = await User.findByPk(userId);

  if (!findUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  await findUser.destroy();

  return findUser.toJSON() as IUser;
};
const userSubscriBing = async (email: string): Promise<ISubscribing | null> => {
  if (!email) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid email address");
  }
  // Check if the email is already subscribed
  const existingSubscription = await SubscriBing.findOne({ where: { email } });

  if (existingSubscription) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already subscribed.");
  }
  // Create a new subscription
  const newSubscription = await SubscriBing.create({ email });

  const subsData = newSubscription.toJSON() as Subscribing;

  return subsData;
};

export const userService = {
  createUser,
  updateUser,
  getAllUsers,
  getUserInfoById,
  getUserByUserName,
  deleteUser,
  userSubscriBing,
};
