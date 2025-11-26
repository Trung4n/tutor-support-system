import { body, param, validationResult } from "express-validator";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { User } from "../models/user.model.js";
import { tokenService } from "../services/token.service.js";
import { AppError } from "@shared/utils/AppError";

export const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      throw new AppError(errorMessages, 400);
    }
    next();
  },
];

export const attachUserFromToken = asyncHandler(async (req, res, next) => {
  const token = req.params.token;

  // Verify extrated Token
  const verified = await tokenService.verifyToken(token);
  if (!verified) return res.status(401).json({ message: "Unauthorized Access!" });
  // Decode token to get payload
  const payload = await tokenService.decodeToken(token);
  const user = await User.findOne({ username: payload.username });
  if (!user) return res.status(400).json({ message: "User not found" });
  const userId = user._id;
  req.userId = userId;
  next();
});
