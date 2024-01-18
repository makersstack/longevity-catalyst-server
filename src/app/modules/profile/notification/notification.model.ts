import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";
import { User } from "../../user/user.model";

// Define the Category model
class ProfileNotify extends Model {}

ProfileNotify.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    notify_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notify_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProfileNotify",
    tableName: "profile_notify",
    timestamps: true, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

ProfileNotify.belongsTo(User, { foreignKey: "notify_by", onDelete: "CASCADE" });
User.hasMany(ProfileNotify, { foreignKey: "notify_by", onDelete: "CASCADE" });

ProfileNotify.belongsTo(User, { foreignKey: "notify_to", onDelete: "CASCADE" });
User.hasMany(ProfileNotify, { foreignKey: "notify_to", onDelete: "CASCADE" });

export { ProfileNotify };
