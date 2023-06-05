import { NextFunction, Request, Response } from "express";

export const isLoggedIn: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
