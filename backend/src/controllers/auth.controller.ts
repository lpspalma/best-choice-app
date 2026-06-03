import { Request, Response, NextFunction } from "express";
import {
  registerUserService,
  loginService,
  getMe,
  googleLoginService,
} from "../services/auth.service";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import { AppError } from "../errors/AppError";

export async function registerUser(
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await loginService(req.body);

    res.status(200).json({
      message: "Login successful",
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await getMe(req.user.id);

  return res.json(user);
}

export async function googleLogin(req: Request, res: Response) {
  const result = await googleLoginService(req.body);

  return res.status(200).json(result);
}
