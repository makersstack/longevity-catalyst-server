import express from "express";
import { skillController } from "./skills.controller";

const router = express.Router();

router.post("/", skillController.createSkill);
router.get("/", skillController.getAllSkill);

export const userSkillRoute = router;
