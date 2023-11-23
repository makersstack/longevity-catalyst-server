import { UserSkillInterface } from "./skills.interface";
import { Skill } from "./skills.model";

const createSkill = async (
  skillName: string[]
): Promise<UserSkillInterface | null> => {
  if (skillName.length === 0) {
    skillName.push("Default Skill");
  }
  const skillData = {
    skillName,
  };

  const skillInstance = await Skill.create(skillData);

  const skillsPlainData = skillInstance.toJSON() as UserSkillInterface;
  return skillsPlainData;
};

const getAllSkill = async (): Promise<Skill[] | null> => {
  const skillInstance = await Skill.findAll();

  return skillInstance;
};

export const skillServices = {
  createSkill,
  getAllSkill,
};
