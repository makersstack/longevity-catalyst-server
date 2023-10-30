// user-skill.service.ts
import { UserSkill } from "./skills.model";

const createUserSkill = async (
  userId: number,
  skillName: string
): Promise<UserSkill> => {
  try {
    const userSkill = await UserSkill.create({ userId, skillName });
    return userSkill;
  } catch (error) {
    throw new Error("Unable to create user skill.");
  }
};
const getUserSkills = async (userId: number): Promise<UserSkill[]> => {
  try {
    const userSkills = await UserSkill.findAll({ where: { userId } });
    return userSkills;
  } catch (error) {
    throw new Error("Unable to fetch user skills.");
  }
};

export const userSkillServices = {
  createUserSkill,
  getUserSkills,
};
