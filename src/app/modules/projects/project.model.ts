/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { User } from "../user/user.model";

class Project extends Model {
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
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("projectDescription"));
      },
      set(value) {
        this.setDataValue("projectDescription", JSON.stringify(value));
      },
    },
    scheduleMeetingLink: {
      type: DataTypes.STRING,
    },
    experienceRequired: {
      type: DataTypes.STRING,
    },
    requiredSkills: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("requiredSkills"));
      },
      set(value) {
        this.setDataValue("requiredSkills", JSON.stringify(value));
      },
    },
    required_skill_list: {
      type: DataTypes.TEXT,
    },
    relevant_link: {
      type: DataTypes.TEXT,
    },
    relevant_literature_link: {
      type: DataTypes.TEXT,
    },
    other_included: {
      type: DataTypes.TEXT,
    },
    linksToRelevantData: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("linksToRelevantData"));
      },
      set(value) {
        this.setDataValue("linksToRelevantData", JSON.stringify(value));
      },
    },
    linksToRelevantLiterature: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("linksToRelevantLiterature"));
      },
      set(value) {
        this.setDataValue("linksToRelevantLiterature", JSON.stringify(value));
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    addressLine: {
      type: DataTypes.STRING,
    },
    city_town: {
      type: DataTypes.STRING,
    },
    state_region_province: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.TEXT,
    },
    final_deliverable_details: {
      type: DataTypes.TEXT,
    },
    additionalInformation: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("additionalInformation"));
      },
      set(value) {
        this.setDataValue("additionalInformation", JSON.stringify(value));
      },
    },
    affiliation: {
      type: DataTypes.STRING,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("keywords"));
      },
      set(value) {
        this.setDataValue("keywords", JSON.stringify(value));
      },
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
    p_deadline: {
      type: DataTypes.STRING,
    },
    // hardDeadline: {
    //   type: DataTypes.STRING,
    // },
    onsite_work: {
      type: DataTypes.STRING,
    },
    projecType: {
      type: DataTypes.STRING,
    },
    projectNature: {
      type: DataTypes.STRING,
    },
    readyToStart: {
      type: DataTypes.STRING,
    },
    projectExperience: {
      type: DataTypes.STRING,
    },
    expectedTimeProject: {
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "projects",
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

Project.belongsTo(User, { foreignKey: "authorId" });

export { Project };
