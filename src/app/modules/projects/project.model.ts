import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";

class Project extends Model {}

Project.init(
  {
    projectTime: {
      type: DataTypes.STRING,
    },
    postAuthInfo: {
      type: DataTypes.JSONB,
    },
    projectTitle: {
      type: DataTypes.STRING,
    },
    projectDescription: {
      type: DataTypes.TEXT,
    },
    scheduleMeetingLink: {
      type: DataTypes.STRING,
    },
    experienceRequired: {
      type: DataTypes.STRING,
    },
    requiredSkills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    linksToRelevantData: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    linksToRelevantLiterature: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    additionalInformation: {
      type: DataTypes.TEXT,
    },
    affiliation: {
      type: DataTypes.STRING,
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    onsiteRequirement: {
      type: DataTypes.STRING,
    },
    projectType: {
      type: DataTypes.STRING,
    },
    membersNeeded: {
      type: DataTypes.STRING,
    },
    primaryCategory: {
      type: DataTypes.STRING,
    },
    deadline: {
      type: DataTypes.STRING,
    },
    expectedDuration: {
      type: DataTypes.STRING,
    },
    timeToStart: {
      type: DataTypes.STRING,
    },
    projectSubmitted: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Project",
  }
);

export default Project;
