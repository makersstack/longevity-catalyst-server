export enum ProjectType {
  Individual = "Individual",
  Team = "Team",
  Other = "Other",
}

export enum ProjectNature {
  GeneralProgramming = "General Programming",
  DataAnalysis = "Data Analysis",
  WetLab = "Wet Lab",
  Other = "Other",
}

export enum ProjectExperience {
  Novice = "Novice",
  Intermediate = "Intermediate",
  Proficient = "Proficient",
  Advanced = "Advanced",
  Expert = "Expert",
}

export enum ExpectedTimeProject {
  LessThan1Week = "Less than 1 week",
  LessThan1Month = "Less than 1 month",
  LessThan3Months = "Less than 3 months",
  GreaterThan3Months = "Greater than 3 months",
  Other = "Other",
}

export enum HaveProjectBudget {
  HaveBudget = "I have a budget",
  RequireVolunteerOrSponsorship = "I will require a volunteer / sponsorship",
}

export enum ReadyToStart {
  Immediately = "Immediately",
  Within1Week = "Within 1 week",
  Within2Week = "Within 2 week",
  Other = "Other",
}

export interface ProjectData {
  id: number;
  authorId: number;
  project_name?: string;
  affiliation?: string;
  project_desc?: string;
  project_keywords?: Record<string, unknown>;
  onsite_work?: boolean;
  address?: string;
  address_line?: string;
  city_town?: string;
  state_region_province?: string;
  zip_code?: string;
  country?: string;
  projecType?: ProjectType;
  projectNature?: ProjectNature;
  projectExperience?: ProjectExperience;
  required_skill_list?: string;
  p_deadline?: string;
  hardDeadline?: boolean;
  expectedTimeProject?: ExpectedTimeProject;
  haveProjectBudget?: HaveProjectBudget;
  answer?: string;
  readyToStart?: ReadyToStart;
  final_deliverable_details?: string;
  relevant_link?: string;
  relevant_literature_link?: string;
  other_included?: string;
  upVoteCount?: number;
  downVoteCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type IProjectFilters = {
  searchTerm?: string;
};

export type IApiResponseProjectData = {
  id: number;
  authorId: number;
  project_name?: string;
  affiliation?: string;
  project_desc?: string;
  project_keywords?: Record<string, unknown>;
  onsite_work?: boolean;
  address?: string;
  address_line?: string;
  city_town?: string;
  state_region_province?: string;
  zip_code?: string;
  country?: string;
  projecType?: ProjectType;
  projectNature?: ProjectNature;
  projectExperience?: ProjectExperience;
  required_skill_list?: string;
  p_deadline?: string;
  hardDeadline?: boolean;
  expectedTimeProject?: ExpectedTimeProject;
  haveProjectBudget?: HaveProjectBudget;
  answer?: string;
  readyToStart?: ReadyToStart;
  final_deliverable_details?: string;
  relevant_link?: string;
  relevant_literature_link?: string;
  other_included?: string;
  upVoteCount?: number;
  downVoteCount?: number;
  createdAt?: string;
  updatedAt?: string;
};
