import { asyncHandler } from "@shared/utils/asyncHandler";
import { authService } from "../services/auth.service.js";
import { tokenService } from "../services/token.service.js";
import { env } from "../config/env.js";
import { MailService } from "@shared/notifications/service";

// FE: mail, username -> api/send-token (data)
// BE: sendToken: check username (in db) and mail (send mail), create token, redis(token, username), req.sub.username, send mail (http://localhost:4002/reset-password?token={token}), return 200
// FE: please check your mail
// User check mail: click link http://localhost:4002/reset-password?token={token}
// FE: pw, confirm pw -> api/reset-password (new pw)
// BE: resetPw: token in param, check token in redis, change pw, delete token, return 200

export const login = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  //--------------test test----------------
  const username = req.body.username;
  const password = req.body.password;
  const valid = await authService.login({ username, password });
  if (valid) res.status(200).json({ message: "" });
  return res.status(400).json({ message: "" });
  // --------------------------------------
});

/**
 * @POST
 * @route /api/auth/change-password
 * @desc Change the password of the authenticated user
 *       Userid is extracted from request object (set by authentication middleware)
 *       Change password using authService.changePassword
 *       Send mail to user if an action of changing password is performed (later)
 */
export const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { currentpassword, newpassword, confirm } = req.body;

  const updatedUser = await authService.changePassword({
    userId,
    currentpassword,
    newpassword,
  });

  return res.status(200).json({
    message: "Password changed successfully",
  });
});

/**
 * @POST
 * @route /api/auth/reset-password
 * @desc Send reset password token to user's mail
 *       Generate token using tokenService.generateToken
 *       Send mail to user using MailService.sendToken (later) including reset link with token
 */
export const sendToken = asyncHandler(async (req, res) => {
  const { username, mail } = req.body;

  // Generate token
  const payload = { username: username, mail: mail };
  const token = await tokenService.generateToken(payload);
  // This url will be sent to user's mail attached with generated Token
  const resetLink = `http://localhost:3002/api/auth/reset-password/${token}`;
  console.log(resetLink);
  // Send mail to user
  // await MailService.sendToken(mail, resetLink);

  return res.status(200).json({
    message: "",
  });
});

/**
 * @POST
 * @route /api/auth/reset-password/:token
 * @desc Reset password using token from param
 *       Extract token from req.params
 *       Extract new password and confirm password from req.body
 *       Extract userId from req (set by attachUserFromToken middleware)
 *       Reset password using authService.resetPassword
 *       Send mail to user if an action of resetting password is performed (later)
 */
export const resetPasswordToken = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const { newpassword, confirm } = req.body;
  const userId = req.userId;

  // Reset password
  const user = await authService.resetPassword({ userId, newpassword, confirm });
  if (user) {
    await tokenService.clearToken(token);
    return res.status(200).json({ message: "" });
  } else {
    return res.status(400).json({ message: "" });
  }
});

export const logout = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});
