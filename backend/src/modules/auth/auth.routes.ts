import { Router } from "express";
import catchErrors from "../../utils/catchError";
import { registerHandler,loginHandler,TestHandler } from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
const userRoutes=Router();

userRoutes.post("/register", catchErrors(registerHandler));
userRoutes.post("/login", catchErrors(loginHandler));
userRoutes.get("/test",authMiddleware ,catchErrors(TestHandler));
export default userRoutes;