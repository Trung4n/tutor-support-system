import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";
import bcrypt from "bcryptjs";

export const authService = {
  async login({ username, password }) {
    // YOUR CODE HERE
    //--------------test test----------------
    const user = await User.findOne({ username: username });
    const validPassword = await user.comparePassword(password);
    if (user == null || !validPassword) return false;
    return true;
    // --------------------------------------
  },
  async changePassword({ userId, currentpassword, newpassword }) {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentpassword, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", 400);
    }
    user.password = newpassword;
    await user.save();

    return user;
  },
  async resetPassword({ userId, newpassword, confirm }) {
    const user = await User.findOne({ _id: userId });
    if (newpassword === confirm) {
      user.password = newpassword;
      user.save();
    } else {
      return null;
    }
    return user;
  },
  async logout({ userId }) {
    // YOUR CODE HERE
  },
};
