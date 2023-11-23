import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../config/sequelize-config";

// Define the Category model
class Categories extends Model {}

Categories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Categories",
    tableName: "categories",
    timestamps: false, // If you don't want timestamps in your table
  }
);
sequelize
  .sync()
  .then(() => {})
  .catch((err) => {
    console.error("Error creating Project table:", err);
  });

export { Categories };
