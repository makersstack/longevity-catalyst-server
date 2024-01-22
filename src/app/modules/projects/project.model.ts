/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { User } from "../user/user.model";
import { Categories } from "./categories/categories.model";

class Project extends Model {
  append: any;
  static async findProjectById(id: number) {
    return Project.findByPk(id);
  }

  static async findAllWithUserLikesVote(id: number, options: any) {
    const projects = await Project.findAll({
      ...options, // Spread the options object
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) 
              FROM project_likes AS user_like 
              WHERE user_like.project_id = Project.id 
              AND user_like.authorId = ${id}
            )`),
            "isLikedByUser",
          ],
          [
            sequelize.literal(`(
              SELECT voteType 
              FROM project_vote AS user_vote 
              WHERE user_vote.project_id = Project.id 
              AND user_vote.authorId = ${id}
            )`),
            "VoteByUser",
          ],
        ],
      },
    });
    const count = await Project.count({
      ...options,
    });

    return { count, projects };
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    project_desc: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    project_keywords: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    primary_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    onsite_work: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_line: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city_town: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_region_province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projecType: {
      type: DataTypes.ENUM("Individual", "Team", "Other"),
      allowNull: true,
    },
    projectNature: {
      type: DataTypes.ENUM(
        "General Programming",
        "Data Analysis",
        "Wet Lab",
        "Other"
      ),
      allowNull: true,
    },
    projectExperience: {
      type: DataTypes.ENUM(
        "Novice",
        "Intermediate",
        "Proficient",
        "Advanced",
        "Expert"
      ),
      allowNull: true,
    },
    required_skill_list: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    p_deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hardDeadline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    expectedTimeProject: {
      type: DataTypes.ENUM(
        "Less than 1 week",
        "Less than 1 month",
        "Less than 3 months",
        "Greater than 3 months",
        "Other"
      ),
      allowNull: true,
    },
    haveProjectBudget: {
      type: DataTypes.ENUM(
        "I have a budget",
        "I will require a volunteer / sponsorship"
      ),
      allowNull: true,
    },
    expected_cost: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    readyToStart: {
      type: DataTypes.ENUM(
        "Immediately",
        "Within 1 week",
        "Within 2 week",
        "Other"
      ),
      allowNull: true,
    },
    final_deliverable_details: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    relevant_link: {
      type: DataTypes.STRING,
    },
    relevant_literature_link: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    other_included: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Public", "Pending", "Draft", "Private"),
      allowNull: true,
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

Project.belongsTo(User, { foreignKey: "authorId", onDelete: "CASCADE" });
Project.belongsTo(Categories, { foreignKey: "primary_category" });
User.hasMany(Project, { foreignKey: "authorId", onDelete: "CASCADE" });

export { Project };
