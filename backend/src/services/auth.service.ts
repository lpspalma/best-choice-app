import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { LoginInput, RegisterInput } from "../validators/auth.validator";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { AppError } from "../errors/AppError";

export async function registerUserService(data: RegisterInput) {
  const { name, email, password } = data;

  const userAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

export async function loginService(data: LoginInput) {
  const { email, password } = data;

  if (!email || !password) {
    throw new AppError("Invalid credentials", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid credentials", 401);
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: tokenGenerator(user),
  };
}

function tokenGenerator(user: User) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    },
  );
}
