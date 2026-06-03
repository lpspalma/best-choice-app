import { Router } from "express";
import {
  registerUser,
  loginUser,
  me,
  googleLogin,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  googleLoginSchema,
} from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "../controllers/passwordReset.controller";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyResetCodeSchema,
} from "../validators/passwordReset.validator";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.post("/google", validate(googleLoginSchema), googleLogin);

router.get("/me", authMiddleware, me);

router.get("/admin-test", authMiddleware, adminMiddleware, (_req, res) => {
  return res.json({
    message: "Admin route accessed successfully",
  });
});

router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post(
  "/verify-reset-code",
  validate(verifyResetCodeSchema),
  verifyResetCode,
);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);
router.post("/google", validate(googleLoginSchema), googleLogin);

export default router;
