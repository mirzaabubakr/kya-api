import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userSchema } from "./validations/user.validation";
import { authData, CustomRequest } from "../auth/interfaces/auth.interface";
import { UserData } from "./interfaces/user.interface";
import { loginSchema } from "./validations/auth.validation";
import { User } from "../../utils/sequelize/sequelize";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

export const register = async (userData: UserData) => {
  try {
    const validUser = userSchema.parse(userData);
    const { name, email, password, role } = validUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { statusCode: 409, message: "User already exists" };
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    if (user) {
    }
    const { password: _, ...userWithoutPassword } = user.get();

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { statusCode: 201, data: { user: userWithoutPassword, token } };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        message: error.errors.map((e) => e.message).join(", "),
      };
    } else {
      return { statusCode: 500, message: error.message };
    }
  }
};

export const login = async (userData: authData) => {
  try {
    const authUser = loginSchema.parse(userData);
    const { email, password } = authUser;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { statusCode: 400, message: "Invalid email or password." };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { statusCode: 400, message: "Invalid email or password." };
    }
    const { password: _, ...userWithoutPassword } = user.get();

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { statusCode: 200, data: { user: userWithoutPassword, token } };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        message: error.errors.map((e) => e.message).join(", "),
      };
    } else {
      return { statusCode: 500, message: error.message };
    }
  }
};
