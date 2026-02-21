import authMiddleware from "../../middleware/auth.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import passport from "./passport.config";
import { Request,Response } from "express";
import { Router } from "express";
import { AuthController } from "./auth.controller";
import { catchErrors } from "../../utils/catchError";
import { authRateLimiter } from "../../middleware/rateLimiter.middleware";

const router = Router();
const controller = new AuthController();

router.post("/register",authRateLimiter, catchErrors(controller.register));
router.post("/login",authRateLimiter, catchErrors(controller.login));
router.get("/test", authMiddleware,authRateLimiter, catchErrors(controller.test));
router.post("/forgot-password", authRateLimiter, catchErrors(controller.forgotPassword));
router.post("/reset-password/:token", authRateLimiter, catchErrors(controller.resetPassword));
  

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    const token = jwt.sign(

      { userId: req.user.userId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  }
);
export default router;