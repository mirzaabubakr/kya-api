const { Sequelize } = require("sequelize");
import dbConfig from "../../config/db";
import { UserModel } from "../../modules/auth/models/user.model";
import { KYCModel } from "../../modules/kyc/model/kyc.model";

const env: string = process.env.NODE_ENV || "development";
const sequelize: typeof Sequelize = new Sequelize(dbConfig[env]);

sequelize
  .sync()
  .then((): void => {
    console.log(" Database connected successfully.");
  })
  .catch((err: Error): void => {
    console.error("Error connecting to the database:", err);
  });

const User = UserModel(sequelize);
const KYC = KYCModel(sequelize);

User.hasOne(KYC, { foreignKey: "userId", as: "kyc" });
KYC.belongsTo(User, { foreignKey: "userId", as: "user" });

export { sequelize, User, KYC };
