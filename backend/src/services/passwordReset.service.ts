import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { AppError } from "../errors/AppError";
import type {
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyResetCodeInput,
} from "../validators/passwordReset.validator";
import { sendPasswordResetCode } from "./email.service";

function generateResetCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function forgotPasswordService(data: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      message: "If this email exists, a reset code was sent",
    };
  }

  const code = generateResetCode();

  await prisma.passwordResetCode.create({
    data: {
      email: data.email,
      code,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  await sendPasswordResetCode({
    to: data.email,
    code,
  });

  return {
    message: "If this email exists, a reset code was sent",
  };
}

export async function verifyResetCodeService(data: VerifyResetCodeInput) {
  const resetCode = await prisma.passwordResetCode.findFirst({
    where: {
      email: data.email,
      code: data.code,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!resetCode) {
    throw new AppError("Invalid or expired code", 400);
  }

  return {
    message: "Code validated successfully",
  };
}

export async function resetPasswordService(data: ResetPasswordInput) {
  const resetCode = await prisma.passwordResetCode.findFirst({
    where: {
      email: data.email,
      code: data.code,
      used: false,
      expiresAt: {
        gt: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!resetCode) {
    throw new AppError("Invalid or expired code", 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetCode.update({
    where: {
      id: resetCode.id,
    },
    data: {
      used: true,
    },
  });

  return {
    message: "Password updated successfully",
  };
}
