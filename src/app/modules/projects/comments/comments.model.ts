import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";
import { Project } from "../project.model";

class Comment extends Model {
  public id!: number;
  public projectId!: number;
  public userId!: number;
  public commentText!: string;
  public updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      /* You can omit the references here if you are manually managing the foreign key */
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
  }
);

Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });
// Establishing the hasMany relationship
Project.hasMany(Comment, { foreignKey: "projectId", onDelete: "CASCADE" }); // A project can have many comments
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });

export default Comment;
