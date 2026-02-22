import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { findOrCreateOAuthUser } from "./auth.service";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config/env";
import { JwtUserPayload } from "../../types/auth.types";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("No email found from Google"), false);
        }

        const user = await findOrCreateOAuthUser({
          provider: "google",
          providerId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
        });

        // 👇 Ensure this is JwtUserPayload
        const jwtPayload: JwtUserPayload = {
          userId: user.id,
          email: user.email,
          role: user.Role,
        };

        return done(null, jwtPayload);
      } catch (err) {
        return done(err as Error, false);
      }
    }
  )
);

export default passport;