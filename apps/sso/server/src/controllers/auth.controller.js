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
  // --redirect in query
  const { username, password, redirect } = req.body;
  const { user } = await authService.login({ username, password });

  req.session.user = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  await req.session.save(); // --no save

  res.status(200).json({
    success: true,
    data: { user }, // --no return user data
    redirect: redirect,
  });
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
  const { currentpassword, newpassword } = req.body;

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
  const token = await tokenService.generateToken(payload); // cryto random
  // This url will be sent to user's mail attached with generated Token
  const resetLink = `<http://localhost:4002/>reset-password?token=${token}`; // link in env
  // Send mail to user
  // await MailService.sendToken(mail, resetLink);

  return res.status(200).json({
    message: "Send ", //
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
  const { username, newpassword } = req.body;
  const userId = req.userId;
  // get token from redis to verify

  // Reset password
  const user = await authService.resetPassword({ userId, newpassword });
  if (user) {
    // await tokenService.clearToken(token); //
    // redis.del(`shorttoken:${shorttoken}`);
    return res.status(200).json({ message: "" }); //
  } else {
    return res.status(400).json({ message: "" });
  }
});

export const logout = asyncHandler(async (req, res) => {
  await req.session.destroy();
  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Successfully logged out" });
});
