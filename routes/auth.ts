import { Router } from "express";
import passport from "passport";

export const auth = Router();

auth
  .route("/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

auth
  .route("/auth/google/callback")
  .get(passport.authenticate("google", { session: false }), (req, res) => {
    res.send("logged in");
  });
