import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  id: number;
  username: string;
  email: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401);
  }

  jwt.verify(token, process.env.SECRET! as string, (err, user) => {
    if (err) {
      return res.status(403);
    }
    req.user = user as JwtPayload & User;
    next();
  });
};
