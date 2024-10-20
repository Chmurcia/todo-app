import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  id: number;
  username: string;
  email: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ status: 401, message: "Access token is missing" });
    return;
  }

  const SECRET = process.env.SECRET;

  if (!SECRET) {
    throw new Error("Missing required environment variable: SECRET");
  }

  jwt.verify(token, SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ status: 403, message: "Invalid token" });
      return;
    }

    req.user = user as JwtPayload & User;

    next();
  });
};
