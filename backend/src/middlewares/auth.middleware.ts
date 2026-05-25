import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

type JwtPayload = {
  userId: string;
  role: string;
};

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Unauthorized", 401);
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    return next();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
}
