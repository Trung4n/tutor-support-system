import { User } from "../models/user.model.js";
import { AppError } from "@shared/utils/AppError";
import bcrypt from "bcryptjs";

export const authService = {
  async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!user.isActive && isPasswordValid){
      user.isActive = true;
      user.failedLoginCount = 0;
      await user.save();
    }

    if (!isPasswordValid) {
      user.failedLoginCount += 1;
      if (user.failedLoginCount >= 3) {
        user.isActive = false;
        await user.save();
        throw new AppError("Too many failed attempts. Account locked", 423);
      }
      await user.save();
      const remainingAttempts = 3 - user.failedLoginCount;
      throw new AppError(`Wrong password. ${remainingAttempts} attempts remaining.`, 401);
    }

    if (user.failedLoginCount > 0) {
      user.failedLoginCount = 0;
      user.isActive = true;
      await user.save();
    }

    const userData = user.toObject();
    delete userData.password;
    delete userData.failedLoginCount;

    return { user: userData };    
  },

  async changePassword({ username, currentPassword, newPassword }) {
    // Implementation for password change
  },
  async findUser({ username, mail }) {
    const user = await User.findOne({ username: username, mail: mail });
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
};
