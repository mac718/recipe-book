import passport from "passport";
import * as passportGoogleOauth2 from "passport-google-oauth2";
import * as dotenv from "dotenv";
import { User } from "./models/user";

dotenv.config();

const GoogleStrategy = passportGoogleOauth2.Strategy;

passport.serializeUser((user, done) => {
  console.log("thinger");
  done(null, user);
});

passport.deserializeUser(async (google_user: any, done) => {
  console.log("googleUser", google_user);
  const user = await User.findById(google_user._id);
  console.log("somethingsomething", user);
  done(null, user);
});

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
        console.log("userpass", user);
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
