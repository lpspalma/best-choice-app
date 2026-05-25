import { Request, Response, NextFunction } from "express";
import { registerUserService, loginService } from "../services/auth.service";
import { LoginInput, RegisterInput } from "../validators/auth.validator";

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
