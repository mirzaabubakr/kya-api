const { Sequelize } = require("sequelize");
import dbConfig from "../../config/db";
import { UserModel } from "../../modules/auth/models/user.model";
import { register } from "../../modules/auth/service";
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

async function createDefaultAdmin() {
  const adminData: any = {
    name: "Admin",
    email: "admin@admin.com",
    password: "Admin!123",
    role: "admin",
  };
  await register(adminData);
}

sequelize
  .sync()
  .then(async (): Promise<void> => {
    console.log("Database connected successfully.");
    await createDefaultAdmin();
  })
  .catch((err: Error): void => {
    console.error("Error connecting to the database:", err);
  });

export { sequelize, User, KYC };
