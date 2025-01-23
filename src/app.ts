import cors from "cors";
import express from "express";

const userRoutes = require("./modules/auth/routes");
const kycRoutes = require("./modules/kyc/routes");

const app = express();
// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api", kycRoutes);

module.exports = app;
