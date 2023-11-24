import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { Skill } from "../../skills/skills.model";
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
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Skill,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "UserSkill",
    tableName: "user_skill",
    timestamps: false,
  }
);

UserSkill.belongsTo(User, { foreignKey: "userId" });
UserSkill.belongsTo(Skill, { foreignKey: "skillId" });

export { UserSkill };
