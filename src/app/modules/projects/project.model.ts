/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";

class Project extends Model {
  [x: string]: any;
  static async findProjectById(id: number) {
    return Project.findByPk(id);
  }
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postAuthInfo: {
      type: DataTypes.TEXT,
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.TEXT,
    },
    linksToRelevantData: {
      type: DataTypes.TEXT,
    },
    linksToRelevantLiterature: {
      type: DataTypes.TEXT,
    },
    additionalInformation: {
      type: DataTypes.TEXT,
    },
    affiliation: {
      type: DataTypes.STRING,
    },
    keywords: {
      type: DataTypes.TEXT,
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
    upVoteCount: {
      type: DataTypes.INTEGER,
    },
    downVoteCount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

export { Project };
