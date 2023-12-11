import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";
import Comment from "../comments/comments.model";
import { Project } from "../project.model";

class Reply extends Model {
  public projectId!: number;
  public userId!: number;
  public commentId!: number;
  public replyText!: string;
  public updatedAt!: Date;
}

Reply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comment,
        key: "id",
      },
    },
    replyText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Reply",
    tableName: "reply",
  }
);

Reply.belongsTo(User, { foreignKey: "userId" });
Reply.belongsTo(Project, { foreignKey: "projectId" });
// Reply.belongsTo(Comment, { foreignKey: "commentId" });

export default Reply;
