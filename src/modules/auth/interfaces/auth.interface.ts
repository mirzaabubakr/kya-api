import { Request } from "express";

export interface authData {
  email: string;
  password: string;
}

export interface CustomRequest extends Request {
  user?: any;
  file?: any;
}
