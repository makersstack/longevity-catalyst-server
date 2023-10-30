import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";

class Reply extends Model {}

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
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.UUID,
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true,
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

export default Reply;
