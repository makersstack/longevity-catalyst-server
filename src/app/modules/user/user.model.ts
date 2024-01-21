import bcrypt from "bcrypt";
import { DataTypes, Model, Op } from "sequelize";
import sequelize from "../../../config/sequelize-config";
import { IUser, Subscribing } from "./user.interface";

class User extends Model<IUser> {
  public id!: number;
  public username!: string;
  public password!: string;

  static async isUserExist(identifier: string) {
    return User.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });
  }
  async isPasswordMatch(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

class SubscriBing extends Model<Subscribing> {
  public id!: number;
}
SubscriBing.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Subscribing",
    tableName: "subscribing",
    timestamps: true,
  }
);
// User.hasOne(UserSkill, { foreignKey: "UserId" });
// User.hasOne(UserSocail, { foreignKey: "UserId" });

export { SubscriBing, User };
