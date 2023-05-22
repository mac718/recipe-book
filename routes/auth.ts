import { Router } from "express";
import passport from "passport";
import { zeroMQ } from "../controllers/auth";

export const auth = Router();

auth
  .route("/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"] }));

auth
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      console.log("user", req.user);
      res.cookie("user", req.user?.google.email, { httpOnly: true });
      res.redirect("http://localhost:3000/recipes");
    }
  );

auth.route("/zeroMQ").post(zeroMQ);
