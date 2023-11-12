import express from "express";
import { userSkillController } from "./skills.controller";
const router = express.Router();

router.post("/", userSkillController.createUserSkill);
router.get("/:id", userSkillController.updateUserSkills);

export const userSkillRoute = router;
