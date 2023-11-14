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
        key: "id",
      },
    },
    socailLinks: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("socailLinks"));
      },
      set(value) {
        this.setDataValue("socailLinks", JSON.stringify(value));
      },
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
