// user-skill.service.ts

import { UserSkill } from "./skills.model";

export class UserSkillService {
  static async createUserSkill(
    userId: number,
    skillName: string
  ): Promise<UserSkill> {
    try {
      const userSkill = await UserSkill.create({ userId, skillName });
      return userSkill;
    } catch (error) {
      throw new Error("Unable to create user skill.");
    }
  }

  static async getUserSkills(userId: number): Promise<UserSkill[]> {
    try {
      const userSkills = await UserSkill.findAll({ where: { userId } });
      return userSkills;
    } catch (error) {
      throw new Error("Unable to fetch user skills.");
    }
  }
}
