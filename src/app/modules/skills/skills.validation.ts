import { z } from "zod";

export const createUserSkillSchema = z.object({
  userId: z.number(),
  skillName: z.string(),
});
