import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import "./passportConfig";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";
import { auth } from "./routes/auth";
import { recipes } from "./routes/recipes";
import { spoonacular } from "./routes/spoonacular";

export const app: Express = express();

dotenv.config();

const port = 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3000/",
      "http://localhost:8000/google",
      "https://accounts.google.com/o/oauth2/v2/auth*",
    ],
    credentials: true,
  })
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY!],
  })
);
app.use(express.json({ limit: "20mb" })); //facilitates image uploads

app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
app.use("/recipes", recipes);
app.use("/spoonacular", spoonacular);
