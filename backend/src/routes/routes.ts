import { de } from "zod/v4/locales";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import { Router } from "express";


const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);


export default router;