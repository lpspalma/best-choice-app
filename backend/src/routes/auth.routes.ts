import { Router } from "express";
import { registerUser, loginUser, me } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.get("/me", authMiddleware, me);

export default router;
