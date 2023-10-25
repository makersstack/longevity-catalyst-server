interface ProjectData {
  projectTime: string;
  postAuthInfo: {
    profileImage: string;
    userName: string;
    userTitle: string;
  };
  projectTitle: string;
  projectDescription: string;
  scheduleMeetingLink: string;
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
}

export default ProjectData;
