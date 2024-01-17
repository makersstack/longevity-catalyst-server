import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";

// Define the Category model
class ProfileFollow extends Model {}

ProfileFollow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    follow_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    follow_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProfileFollow",
    tableName: "profile_follow",
    timestamps: true, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

ProfileFollow.belongsTo(User, { foreignKey: "follow_by", onDelete: "CASCADE" });
User.hasMany(ProfileFollow, { foreignKey: "follow_by", onDelete: "CASCADE" });

ProfileFollow.belongsTo(User, { foreignKey: "follow_to", onDelete: "CASCADE" });
User.hasMany(ProfileFollow, { foreignKey: "follow_to", onDelete: "CASCADE" });

export { ProfileFollow };
