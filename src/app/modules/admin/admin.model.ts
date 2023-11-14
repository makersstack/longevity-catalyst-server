import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { errorlogger } from "../../../shared/logger";
import { Admin } from "./admin.interface";

class AdminModel extends Model<Admin> {}

AdminModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "admin",
    },
  },
  {
    sequelize,
    modelName: "AdminModel",
    tableName: "admins",
    timestamps: true,
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    errorlogger.error("Error creating User table:", err);
  });

export default AdminModel;
