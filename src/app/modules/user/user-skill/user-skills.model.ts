import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { Skill } from "../../skills/skills.model";
import { User } from "../user.model";

class UserSkill extends Model {
  id!: number;
  userId!: number;
  skillId!: number;
}

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
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserSkill",
    tableName: "user_skill",
    timestamps: false,
  }
);

User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: "skillId",
  onDelete: "CASCADE",
});

export { UserSkill };
