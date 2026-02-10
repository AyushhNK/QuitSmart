import { de } from "zod/v4/locales";
import userRoutes from "../modules/auth/auth.routes";
import { Router } from "express";


const router = Router();

router.use("/auth", userRoutes);


export default router;