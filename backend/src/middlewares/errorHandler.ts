import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

type BodyParserError = SyntaxError & {
  type?: string;
  body?: unknown;
};

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parseError = error as BodyParserError;

  if (
    parseError instanceof SyntaxError &&
    parseError.type === "entity.parse.failed"
  ) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
  });
}
