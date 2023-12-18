import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { Categories } from "../categories/categories.model";
import { Project } from "../project.model";

// Define the Category model
class ProjectCategory extends Model {}

ProjectCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "ProjectCategory",
    tableName: "project_category",
    timestamps: true, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

ProjectCategory.belongsTo(Project, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});
ProjectCategory.belongsTo(Categories, { foreignKey: "category_id" });
Project.hasMany(ProjectCategory, {
  foreignKey: "project_id",
  onDelete: "CASCADE",
});

export { ProjectCategory };
