import { UserSkillInterface } from "./skills.interface";
import { UserSkill } from "./skills.model";

const createUserSkill = async (
  userId: number,
  skillName: string[]
): Promise<UserSkillInterface | null> => {
  if (skillName.length === 0) {
    skillName.push("Default Skill");
  }
  const userSkillData = {
    userId,
    skillName,
  };

  const userSkillInstance = await UserSkill.create(userSkillData);

  const userSkillsPlainData = userSkillInstance.toJSON() as UserSkillInterface;
  return userSkillsPlainData;
};

export const userSkillServices = {
  createUserSkill,
};
