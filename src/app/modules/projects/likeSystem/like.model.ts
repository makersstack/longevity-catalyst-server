import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";
import { Project } from "../project.model";

// Define the Category model
class ProjectLike extends Model {}

ProjectLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProjectLike",
    tableName: "project_likes",
    timestamps: true, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

ProjectLike.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});
ProjectLike.belongsTo(User, { foreignKey: "authorId", onDelete: "CASCADE" });
User.hasMany(ProjectLike, { foreignKey: "authorId", onDelete: "CASCADE" });
Project.hasMany(ProjectLike, { foreignKey: "project_id", onDelete: "CASCADE" });

export { ProjectLike };
