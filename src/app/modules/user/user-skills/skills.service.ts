// user-skill.service.ts
import { UserSkill } from "./skills.model";

const createUserSkill = async (
  userId: number,
  skillName: string
): Promise<UserSkill> => {
  try {
    const userSkills = await UserSkill.create({ userId, skillName });
    return userSkills;
  } catch (error) {
    throw new Error("Unable to create user skill.");
  }
};

const getSingleUserSkill = async (userId: number): Promise<UserSkill[]> => {
  try {
    const userSkills = await UserSkill.findAll({ where: { userId } });
    return userSkills;
  } catch (error) {
    throw new Error("Unable to fetch user skills.");
  }
};

export const userSkillServices = {
  createUserSkill,
  getSingleUserSkill,
};
