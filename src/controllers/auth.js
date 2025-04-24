const {
  userLogin,
  resetPassword,
  requestResetPasswordLink,
  userLogout,
} = require("../services/auth");
const response = require("../../utils/response");
const { verifyAcessToken } = require("../services/jwt");

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

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
      return response.unauthorized(res, "Token is missing, User not logged in.");
    }

    const decoded = verifyAcessToken(token) ;

    const loggedOutUser = await userLogout(decoded);
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
