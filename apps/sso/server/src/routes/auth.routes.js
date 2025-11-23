import { Router } from "express";
import {
  login,
  changePassword,
  sendToken,
  resetPasswordToken,
} from "../controllers/auth.controller.js";
import {
  checkUserExists,
  attachUserFromToken,
  validateUsername,
  validateMail,
  validatePassword,
  handleValidation,
} from "../middlewares/validate.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
// router.post("/register", <middleware> ,register);
router.post("/login", login);

router.post(
  "/change-password",
  ...validateUsername,
  ...validatePassword,
  handleValidation,
  checkUserExists,
  handleValidation,
  changePassword
);

router.post(
  "/reset-password",
  ...validateUsername,
  ...validateMail,
  handleValidation,
  checkUserExists,
  sendToken
);

router.post(
  "/reset-password/:token",
  attachUserFromToken,
  ...validatePassword,
  handleValidation,
  resetPasswordToken
);
