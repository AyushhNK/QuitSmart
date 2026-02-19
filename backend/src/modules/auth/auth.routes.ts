import { Router } from "express";
import catchErrors from "../../utils/catchError";
import { registerHandler,loginHandler,TestHandler } from "./auth.controller";
import authMiddleware from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
import { UserRole } from "../users/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env";
import passport from "./passport.config";
const authRoutes=Router();

authRoutes.post("/register", catchErrors(registerHandler));
authRoutes.post("/login", catchErrors(loginHandler));
authRoutes.get("/test",authMiddleware,authorize(UserRole.ADMIN), catchErrors(TestHandler));
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2 → Callback
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: any, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  }
);
export default authRoutes;