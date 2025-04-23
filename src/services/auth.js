const jwt = require("jsonwebtoken");
const db = require("../models");
const { client } = require("../../config/redis");
const sendEmail = require("../../utils/email");
const { htmlContent } = require("../../utils/resetPasswordHTML");
const { handleSuccess } = require("../../utils/successHandler");
const {
  ValidationError,
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");

require("dotenv").config();

// Generates a signed JWT token
const createToken = (userId, userName) => {
  return jwt.sign({ userId, name: userName }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN || "24h",
  });
};

// Login User
exports.userLogin = async (email, password) => {
  const user = await db.user.findOne({ email });
  if (!user) {
    throw new DataNotFoundError(`User not found with Email ${email}`);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ValidationError("Invalid Password!");
  }

  const token = createToken(user._id, user.userName || "User");
  await client.set(`user:${user._id}`, token);

  const userToken = await db.userToken.findOneAndUpdate(
    { userId: user._id },
    { token },
    { new: true, upsert: true }
  );

  return handleSuccess("User logged in successfully", {
    userId: user._id,
    token: userToken.token,
  });
};

// Logout User
exports.userLogout = async (userId) => {
  const userToken = await db.userToken.findOne({ userId });
  const result = await db.userToken.deleteOne({ userId });

  if (userToken) {
    await client.del(`user:${userId}`);
  }

  if (result.deletedCount) {
    return handleSuccess("User logged out successfully");
  }

  throw new BadRequestError("User logout failed");
};

// Request Password Reset Link
exports.requestResetPasswordLink = async ({ email }) => {
  const user = await db.user.findOne({ email });
  if (!user) {
    throw new DataNotFoundError(`User not found with Email ${email}`);
  }

  const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetUrl = new URL(
    `/api/auth/reset-password/${resetToken}`,
    process.env.URL
  ).toString();

  await sendEmail(user.email, "Password Reset", htmlContent(resetUrl));

  return handleSuccess("Password reset email sent.");
};

// Reset Password
exports.resetPassword = async (token, { newPassword }) => {
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new BadRequestError("Invalid or expired reset token");
  }

  const user = await db.user.findOneAndUpdate(
    { _id: decoded.userId },
    { password: newPassword }
  );

  if (!user) {
    throw new DataNotFoundError(`User not found with ID ${decoded.userId}`);
  }

  return handleSuccess("Password reset successfully");
};
