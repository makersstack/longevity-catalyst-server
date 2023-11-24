import { UserSkillInterface } from "./user-skill.interface";
import { UserSkill } from "./user-skills.model";

const createUserSkill = async (
  userId: number,
  skillId: number
): Promise<UserSkillInterface | null> => {
  const skillData = {
    userId,
    skillId,
  };

  const skillInstance = await UserSkill.create(skillData);

  const skillsPlainData = skillInstance.toJSON() as UserSkillInterface;

  return skillsPlainData;
};
export const userSkillServices = {
  createUserSkill,
};
