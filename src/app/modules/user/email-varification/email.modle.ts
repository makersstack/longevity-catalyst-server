// import { DataTypes, Optional } from "sequelize";
// import sequelize from "../../../../config/sequelize-config";

// interface UserAttributes {
//   email: string;
//   isEmailVerified: boolean;
//   verificationToken?: string;
// }

// interface UserCreationAttributes
//   extends Optional<UserAttributes, "isEmailVerified"> {}

// const User = sequelize.define<UserAttributes, UserCreationAttributes>("User", {
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   isEmailVerified: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
//   verificationToken: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
// });

// export default User;
