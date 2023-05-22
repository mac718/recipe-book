import passport from "passport";
import { Request, Response } from "express";
import * as zmq from "zeromq";

// export const registerOrLogin = async (req: Request, res: Response) => {
//   await passport.authenticate("google", { scope: ["email", "profile"] });
//   res.send();
// };

export const zeroMQ = async (req: Request, res: Response) => {
  console.log("body", req.body);
  const message = req.body.message;
  console.log(message);
  const sock = new zmq.Request();
  sock.connect("tcp://localhost:5555");

  for (let i = 0; i < 10; i++) {
    await sock.send(message);
  }
  res.send();
};
