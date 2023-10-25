// user-skill.controller.ts
import { Request, Response } from "express";
import { UserSkillService } from "./skills.service";

export class UserSkillController {
  static async createUserSkill(req: Request, res: Response) {
    try {
      const { userId, skillName } = req.body;
      const userSkill = await UserSkillService.createUserSkill(
        userId,
        skillName
      );
      return res.status(201).json(userSkill);
    } catch (error) {
      return res.status(500).json({ error: "Unable to create user skill." });
    }
  }

  static async getUserSkills(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const userSkills = await UserSkillService.getUserSkills(userId);
      return res.json(userSkills);
    } catch (error) {
      return res.status(500).json({ error: "Unable to fetch user skills." });
    }
  }
}
