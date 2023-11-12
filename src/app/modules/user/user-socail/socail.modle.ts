import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../user.model";

class UserSocail extends Model {}

UserSocail.init(
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
        key: "userId",
      },
    },
    interestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserSocail",
    tableName: "user_socail",
    timestamps: false,
  }
);

UserSocail.belongsTo(User, { as: "User", foreignKey: "userId" });

export { UserSocail };
