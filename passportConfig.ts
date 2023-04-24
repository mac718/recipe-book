import passport from "passport";
import * as passportGoogleOauth2 from "passport-google-oauth2";
import * as dotenv from "dotenv";
import { User } from "./models/user";

dotenv.config();

const GoogleStrategy = passportGoogleOauth2.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ "google.id": profile.id });
        console.log("user", user);
        if (!user) {
          const newUser = await User.create({
            google: {
              id: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value,
            },
          });
          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, user);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
