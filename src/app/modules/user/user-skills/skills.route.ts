import express from "express";
import { UserSkillController } from "./skills.controller";
const router = express.Router();

router.post("/", UserSkillController.createUserSkill);

export const userSkillRoute = router;
