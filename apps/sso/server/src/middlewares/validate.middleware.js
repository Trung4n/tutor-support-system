import { body, param, validationResult } from "express-validator";
import { asyncHandler } from "@shared/utils/asyncHandler";
import { User } from "../models/user.model.js";
import { tokenService } from "../services/token.service.js";
import { AppError } from "@shared/utils/AppError";

const keyboardCharsRegex = /^[A-Za-z0-9 !@#$%^&*()_\-+=\[\]{}|;:'",.<>/?`~\\]*$/;
const noEmoji = (field) => {
  return body(field)
    .matches(keyboardCharsRegex)
    .withMessage(`${field} contains invalid characters`);
};

export const checkUserExists = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });
  req.user = user;
  next();
});

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

// Username validator
export const validateUsername = [
  body("username").notEmpty().withMessage("Username is required"),
  noEmoji("username"),
];

// Mail validator
export const validateMail = [
  body("mail")
    .notEmpty()
    .withMessage("Mail is required")
    .isEmail()
    .withMessage("Invalid email format"),
  noEmoji("mail"),
];

export const validatePassword = [
  // username
  body("username").notEmpty().withMessage("Username is required"),
  noEmoji("username"),

  // current password
  body("currentpassword").notEmpty().withMessage("Current password is required"),
  noEmoji("currentpassword"),

  // new password
  body("newpassword").notEmpty().withMessage("New password is required"),
  noEmoji("newpassword"),

  // confirm password
  body("confirm")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newpassword) {
        throw new AppError("Confirm password does not match", 400);
      }
      return true;
    }),
  noEmoji("confirm"),
];

export const handleValidation = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return res.status(400).json({ message });
  }
  next();
});
