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
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("skillName"));
      },
      set(value) {
        this.setDataValue("skillName", JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    modelName: "UserSkill",
    tableName: "user_skills",
    timestamps: false,
  }
);

UserSkill.belongsTo(User, { foreignKey: "userId" });

export { UserSkill };
