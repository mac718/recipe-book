import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.redirect("http://localhost:3000");
    //res.sendStatus(401);
  }
};
