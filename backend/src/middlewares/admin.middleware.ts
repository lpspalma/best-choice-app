import { type NextFunction, type Request, type Response } from "express";
import { Role } from "@prisma/client";
import { AppError } from "../errors/AppError";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  if (req.user.role !== Role.ADMIN) {
    throw new AppError("Forbidden", 403);
  }

  return next();
}
