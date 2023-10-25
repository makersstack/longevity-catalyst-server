// user-skill.model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../user.model";

class UserSkill extends Model {}

UserSkill.init(
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
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserSkill",
    tableName: "user_skills",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating User table:", err);
  });

export { UserSkill };
