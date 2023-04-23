import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";

const app: Express = express();

dotenv.config();

const port = 8000;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
