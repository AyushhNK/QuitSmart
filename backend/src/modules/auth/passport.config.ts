import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AuthService } from "./auth.service";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config/env";

const authService = new AuthService();

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.findOrCreateOAuthUser({
          provider: "google",
          providerId: profile.id,
          email: profile.emails?.[0].value,
          name: profile.displayName,
        });

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
