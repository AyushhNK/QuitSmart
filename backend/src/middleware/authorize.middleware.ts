// middleware/authorize.ts
import { Request,Response, NextFunction } from "express";
import { UserRole } from "../modules/users/user.model";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.Role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    console.log(`User ${req.user.userId} with role ${req.user.Role} authorized to access this route.`);
    next();
  };
};
