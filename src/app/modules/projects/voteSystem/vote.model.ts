import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";
import { Project } from "../project.model";

// Define the Category model
class ProjectVote extends Model {}

ProjectVote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
    voteType: {
      type: DataTypes.ENUM("up", "down"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProjectVote",
    tableName: "project_vote",
    timestamps: true, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

ProjectVote.belongsTo(Project, { foreignKey: "project_id" });
Project.belongsTo(User, { foreignKey: "authorId" });

export { ProjectVote };
