import { Router } from "express";
import catchErrors from "../../utils/catchError";
import { registerHandler,loginHandler,TestHandler } from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { UserRole } from "../users/user.model";
const authRoutes=Router();

authRoutes.post("/register", catchErrors(registerHandler));
authRoutes.post("/login", catchErrors(loginHandler));
authRoutes.get("/test",authMiddleware,authorize(UserRole.ADMIN), catchErrors(TestHandler));
export default authRoutes;