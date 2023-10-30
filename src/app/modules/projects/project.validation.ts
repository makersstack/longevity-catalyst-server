import { z } from "zod";

const projectSchema = z.object({
  projectTime: z.string(),
  postAuthInfo: z.object({
    profileImage: z.string(),
    user_name: z.string(),
    user_title: z.string(),
  }),
  projectTitle: z.string(),
  projectDescription: z.string(),
  scheduleMeetingLink: z.string().optional(),
  experienceRequired: z.string(),
  requiredSkills: z.array(z.string()),
  linksToRelevantData: z.array(z.string()),
  linksToRelevantLiterature: z.array(z.string()),
  additionalInformation: z.string(),
  affiliation: z.string(),
  keywords: z.array(z.string()),
  onsiteRequirement: z.string(),
  projectType: z.string(),
  membersNeeded: z.string(),
  primaryCategory: z.string(),
  deadline: z.string(),
  expectedDuration: z.string(),
  timeToStart: z.string(),
  projectSubmitted: z.string(),
});

export { projectSchema };
