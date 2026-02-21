import { Request,Response } from "express";
import { createAccount, login,forgotPassword,resetPassword } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schema";
import logger from "../../utils/logger";

export class AuthController {
  // Register user
  async register(req: Request, res: Response) {
    logger.info("Register request received");

    const request = registerSchema.parse({ ...req.body });
    logger.debug(`Creating account for email: ${request.email}`);

    const { user, accessToken, refreshToken } = await createAccount(request);

    logger.info(`User registered successfully: ${user.id}`);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(201)
      .json({ user, accessToken, refreshToken });
  }

  // Login user
  async login(req: Request, res: Response) {
    logger.info("Login request received");

    const request = loginSchema.parse({ ...req.body });
    logger.debug(`Login attempt for email: ${request.email}`);

    const { user, accessToken, refreshToken } = await login(request);

    logger.info(`User logged in successfully: ${user.id}`);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ user, accessToken, refreshToken });
  }

  async forgotPassword(req: Request, res: Response) {
    await forgotPassword(req.body.email);
    res.json({ message: "If email exists, reset link sent." });
  }

  async resetPassword(req: Request<{ token: string }>, res: Response) {
    await resetPassword(req.params.token, req.body.password);
    res.json({ message: "Password reset successful" });
  }
  
  // Test protected route
  async test(req: Request, res: Response) {
    if (!req.user) {
      logger.warn("Unauthorized access attempt to protected route");
      return res.status(401).json({
        message: "Unauthorized - No user information",
      });
    }
    logger.info(`Protected route accessed by user: ${req.user.userId}`);

    res.status(200).json({
      message: "Protected route accessed successfully",
      user: req.user,
    });
  }
}