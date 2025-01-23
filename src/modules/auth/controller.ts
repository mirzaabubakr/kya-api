import { Request, Response } from "express";
import { login, register } from "./service";
import { userSchema } from "./validations/user.validation";
import { z } from "zod";
import { loginSchema } from "./validations/auth.validation";

export const registerUser = async (req: Request, res: Response) => {
  const result = await register(req.body);
  if (result.statusCode === 201) {
    res.status(201).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const result = await login(req.body);

  if (result.statusCode === 200) {
    res.status(200).json(result.data);
  } else {
    res.status(result.statusCode).json({ message: result.message });
  }
};
