// user-skill.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { userSkillServices } from "./skills.service";

const createUserSkill = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userId, skillName } = req.body;
    const userSkill = await userSkillServices.createUserSkill(
      userId,
      skillName
    );
    return res.status(201).json(userSkill);
  } catch (error) {
    return res.status(500).json({ error: "Unable to create user skill." });
  }
});

const getUserSkills = catchAsync(async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const userSkills = await userSkillServices.getUserSkills(userId);
    return res.json(userSkills);
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch user skills." });
  }
});

export const userSkillController = {
  createUserSkill,
  getUserSkills,
};
