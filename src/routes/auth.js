const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");

const {
  loginUser,
  logoutUser,
  resetPassword,
  sendResetPasswordLink,
} = require("../controllers/auth");
const createRoute = require("../../utils/createRoute");


// Auth routes
createRoute(router,"post", "/logout", logoutUser , checkAuth);
createRoute(router,"post", "/login", loginUser);
createRoute(router,"post", "/forgot-password", sendResetPasswordLink);
createRoute(router,"post", "/reset-password/:token", resetPassword );

module.exports = router;
