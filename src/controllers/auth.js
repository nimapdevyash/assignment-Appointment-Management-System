const {
  userLogin,
  resetPassword,
  requestResetPasswordLink,
  userLogout,
} = require("../services/auth");
const response = require("../../utils/response");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
      return response.badRequest(res, "Email and password are required.");
    }

    const loggedInUser = await userLogin(email, password);
    return response.ok(res, loggedInUser);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred during login.");
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const userId = req.userDetail.id;

    // Ensure user is logged in
    if (!userId) {
      return response.unauthorized(res, "User not logged in.");
    }

    const loggedOutUser = await userLogout(userId);
    return response.ok(res, loggedOutUser);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred during logout.");
  }
};

exports.sendResetPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;

    // Ensure email is provided
    if (!email) {
      return response.badRequest(res, "Email is required.");
    }

    const sendEmail = await requestResetPasswordLink({ email });
    return response.ok(res, sendEmail);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while sending the reset password link."
    );
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Ensure new password is provided
    if (!newPassword) {
      return response.badRequest(res, "New password is required.");
    }

    const resetPass = await resetPassword(token, { newPassword });
    return response.ok(res, resetPass);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while resetting the password."
    );
  }
};
