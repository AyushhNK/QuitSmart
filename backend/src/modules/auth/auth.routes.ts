import { Router } from "express";
import catchErrors from "../../utils/catchError";
import { registerHandler,loginHandler } from "./auth.controller";
const userRoutes=Router();

userRoutes.post("/register", catchErrors(registerHandler));
userRoutes.post("/login", catchErrors(loginHandler));
export default userRoutes;