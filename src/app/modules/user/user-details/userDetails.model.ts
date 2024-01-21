import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../user.model";

class UserDetails extends Model {}

UserDetails.init(
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
    company: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    lives_in: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    home_state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    portfolio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserDetails",
    tableName: "user_details",
    timestamps: false,
  }
);

UserDetails.belongsTo(User, {
  as: "User",
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasOne(UserDetails, { foreignKey: "userId", onDelete: "CASCADE" });
export { UserDetails };
