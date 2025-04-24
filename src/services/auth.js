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
const { createAcessToken } = require("./jwt");

require("dotenv").config();


// Login User
exports.userLogin = async (email, password) => {

  const user = await db.user.findOne({ email });

  if (!user) {
    throw new DataNotFoundError(`User not found with Email ${email}`);
  }

  const pToken = await client.get(`${user._id}`)

  if(pToken) {
    return handleSuccess("User is Already Logged in" , {
      userId : user._id,
      token : pToken
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) {
    throw new ValidationError("Invalid Password!");
  }

  const token = await createAcessToken({userId : user._id}) ;
  await client.set( `${user._id}` ,token );

  return handleSuccess("User logged in successfully", {
    userId: user._id,
    token
  });
};

// Logout User
exports.userLogout = async (user) => {

  const delCOunt = await client.del(user.userId)

  if (!delCOunt) {
    throw new BadRequestError("User logout failed or already logged out");
  }

  return handleSuccess("User logged out successfully");
};


// Request Password Reset Link
exports.requestResetPasswordLink = async ({ email }) => {
  const user = await db.user.findOne({ email });
  if (!user) {
    throw new DataNotFoundError(`User not found with Email ${email}`);
  }

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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
exports.resetPassword = async (userId,newPassword) => {
  
  const user = await db.user.findOneAndUpdate(
    { _id: userId },
    { password: newPassword }
  );

  if (!user) {
    throw new DataNotFoundError(`User not found with ID ${userId}`);
  }

  return handleSuccess("Password reset successfully");
};
