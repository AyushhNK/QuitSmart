import { JwtUserPayload } from "./auth.types";

declare global {
  namespace Express {
    // Override Express.User to match JWT payload
    interface User extends JwtUserPayload {}
    // Request.user now uses your User type
    interface Request {
      user?: User; // optional for public routes
    }
  }
}

export {};