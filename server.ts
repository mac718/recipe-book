import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import "./passportConfig";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";
import { auth } from "./routes/auth";
import { recipes } from "./routes/recipes";

const app: Express = express();

dotenv.config();

const port = 8000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8000/google",
      "https://accounts.google.com/o/oauth2/v2/auth*",
    ],
    credentials: true,
  })
);

//app.use(epxress_session({ secret: "secret" }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY!],
  })
);
app.use(express.json({ limit: "20mb" }));

app.use(passport.initialize());
app.use(passport.session());

app.use(auth);
app.use(recipes);

mongoose
  .connect(process.env.MONGODB_URI!, {} as mongoose.ConnectOptions)
  .then(() =>
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
  );
