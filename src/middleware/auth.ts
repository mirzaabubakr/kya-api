import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../modules/auth/interfaces/auth.interface";

const jwt = require("jsonwebtoken");

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  const JWT_SECRET: string = process.env.JWT_SECRET || "";

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded || "";
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
