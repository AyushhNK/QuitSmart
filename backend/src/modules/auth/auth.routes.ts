import { Router } from "express";
import catchErrors from "../../utils/catchError";
import { registerHandler,loginHandler,TestHandler } from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { UserRole } from "../users/user.model";
const userRoutes=Router();

userRoutes.post("/register", catchErrors(registerHandler));
userRoutes.post("/login", catchErrors(loginHandler));
userRoutes.get("/test",authMiddleware,authorize(UserRole.ADMIN), catchErrors(TestHandler));
export default userRoutes;