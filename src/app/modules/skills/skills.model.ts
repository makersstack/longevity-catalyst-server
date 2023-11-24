import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";

class Skill extends Model {}

Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Skill",
    tableName: "skill",
    timestamps: false,
  }
);

export { Skill };
