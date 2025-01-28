const { Sequelize } = require("sequelize");
import dbConfig from "../../config/db";
import { UserModel } from "../../modules/auth/models/user.model";
import { register } from "../../modules/auth/service";
import { KYCModel } from "../../modules/kyc/model/kyc.model";

const env: string = process.env.NODE_ENV || "development";
const config = dbConfig[env] || dbConfig.development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

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
  try {
    const adminData = {
      name: "Admin",
      email: "admin@admin.com",
      password: "Admin!123",
      role: "admin",
    };

    const existingAdmin = await User.findOne({
      where: { email: adminData.email },
    });
    if (!existingAdmin) {
      await register(adminData);
      console.log("Default admin user created.");
    } else {
      console.log("Default admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating default admin user:", error);
  }
}

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");

    await createDefaultAdmin();
  } catch (error) {
    console.error("Error initializing the database:", error);
  }
}

// Initialize the database
initializeDatabase();

export { sequelize, User, KYC };
