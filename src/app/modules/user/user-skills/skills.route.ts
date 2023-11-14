import express from "express";
import { userSkillController } from "./skills.controller";

const router = express.Router();

router.post("/", userSkillController.createUserSkill);

export const userSkillRoute = router;
