import { Response, NextFunction } from "express";
import { CustomRequest } from "../modules/auth/interfaces/auth.interface";

const roleAuth =
  (roles: any) => (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role as any)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };

module.exports = roleAuth;
