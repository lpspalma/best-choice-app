import { Request, Response } from "express";
import {
  forgotPasswordService,
  resetPasswordService,
  verifyResetCodeService,
} from "../services/passwordReset.service";

export async function forgotPassword(req: Request, res: Response) {
  const result = await forgotPasswordService(req.body);

  return res.status(200).json(result);
}

export async function verifyResetCode(req: Request, res: Response) {
  const result = await verifyResetCodeService(req.body);

  return res.status(200).json(result);
}

export async function resetPassword(req: Request, res: Response) {
  const result = await resetPasswordService(req.body);

  return res.status(200).json(result);
}
