/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { User } from "../user/user.model";
import { Categories } from "./categories/categories.model";

class Project extends Model {
  static async findProjectById(id: number) {
    return Project.findByPk(id);
  }

  static async findAllWithUserLikes(id: number, options: any) {
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
      references: {
        model: User,
        key: "id",
      },
    },
    project_name: {
      type: DataTypes.STRING,
    },
    affiliation: {
      type: DataTypes.STRING,
    },
    project_desc: {
      type: DataTypes.TEXT("long"),
    },
    project_keywords: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
    primary_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categories,
        key: "id",
      },
    },
    onsite_work: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    address_line: {
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
    projecType: {
      type: DataTypes.ENUM("Individual", "Team", "Other"),
      defaultValue: "Other",
    },
    projectNature: {
      type: DataTypes.ENUM(
        "General Programming",
        "Data Analysis",
        "Wet Lab",
        "Other"
      ),
      defaultValue: "Other",
    },
    projectExperience: {
      type: DataTypes.ENUM(
        "Novice",
        "Intermediate",
        "Proficient",
        "Advanced",
        "Expert"
      ),
      defaultValue: "Novice",
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
    },
    expectedTimeProject: {
      type: DataTypes.ENUM(
        "Less than 1 week",
        "Less than 1 month",
        "Less than 3 months",
        "Greater than 3 months",
        "Other"
      ),
      defaultValue: "Other",
    },
    haveProjectBudget: {
      type: DataTypes.ENUM(
        "I have a budget",
        "I will require a volunteer / sponsorship"
      ),
      defaultValue: "I have a budget",
    },
    expected_cost: {
      type: DataTypes.TEXT("long"),
    },
    readyToStart: {
      type: DataTypes.ENUM(
        "Immediately",
        "Within 1 week",
        "Within 2 week",
        "Other"
      ),
      defaultValue: "Other",
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
    },
    upVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
Project.belongsTo(Categories, { foreignKey: "primary_category" });

export { Project };
