import { de } from "zod/v4/locales";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/users/user.routes";
import { Router } from "express";
import notificationRoutes from "../modules/notification/notification.routes";
import trackerRoutes from "../modules/tracker/tracker.routes";
import goalRoutes from "../modules/goals/goals.routes";
import progressRoutes from "../modules/progress/progress.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationRoutes);
router.use("/tracker", trackerRoutes);
router.use("/goals", goalRoutes);
router.use("/progress", progressRoutes);


export default router;