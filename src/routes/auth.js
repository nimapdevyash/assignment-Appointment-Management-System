const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const {
  loginUser,
  logoutUser,
  resetPassword,
  sendResetPasswordLink,
} = require("../controllers/auth");

// Login route
router.post("/login", errorWrapper(loginUser));

// Logout route (protected by authentication)
router.post("/logout", checkAuth, errorWrapper(logoutUser));

// Send reset password link (protected by authentication)
router.post("/forgot-password", checkAuth, errorWrapper(sendResetPasswordLink));

// Reset password route, uses a token in the URL
router.post("/reset-password/:token", errorWrapper(resetPassword));

module.exports = router;
