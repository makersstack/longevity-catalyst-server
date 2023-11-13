export interface ProjectData {
  id: number;
  projectTime: string;
  authorId: number;
  projectTitle: string;
  projectDescription?: string;
  scheduleMeetingLink?: string;
  experienceRequired: string;
  linksToRelevantData: string[];
  linksToRelevantLiterature: string[];
  additionalInformation: string;
  affiliation: string;
  keywords: string[];
  onsiteRequirement: string;
  projectType: string;
  membersNeeded: string;
  primaryCategory: string;
  requiredSkills: string[];
  deadline: string;
  expectedDuration: string;
  timeToStart: string;
  projectSubmitted: string;
  upVoteCount?: number;
  downVoteCount?: number;
}

export type IProjectFilters = {
  searchTerm?: string;
};

export type IApiResponseProjectData = {
  id: number;
  projectTime: string;
  authorId: number;
  projectTitle: string;
  projectDescription?: string;
  scheduleMeetingLink?: string;
  experienceRequired: string;
  linksToRelevantData: string[];
  linksToRelevantLiterature: string[];
  additionalInformation: string;
  affiliation: string;
  keywords: string[];
  onsiteRequirement: string;
  projectType: string;
  membersNeeded: string;
  primaryCategory: string;
  requiredSkills: string[];
  deadline: string;
  expectedDuration: string;
  timeToStart: string;
  projectSubmitted: string;
};
