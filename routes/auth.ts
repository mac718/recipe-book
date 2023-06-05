import { Router } from "express";
import passport from "passport";

export const auth = Router({ strict: true });

auth
  .route("/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

auth
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.cookie("user", req.user?.google.email, {
        httpOnly: true,
        maxAge: 6000000,
      });
      res.redirect("http://localhost:3000/recipes");
    }
  );
