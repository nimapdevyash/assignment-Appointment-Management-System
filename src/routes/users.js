const express = require("express");
const router = express.Router();
const createRoute = require("../../utils/createRoute");
const checkAuth = require("../middleWare/checkAuth");

const {
  insertUser,
  retrieveUser,
  retrieveUserById,
  modifyUser,
  removeUser,
  handleMeetingInvite,
  blockOtherUser,
  unblockOtherUser,
  retrieveBlockedUsers,
} = require("../controllers/user");

// Register routes
createRoute(
  router,
  "post",
  "/handle-invite/:meetingId",
  handleMeetingInvite,
  checkAuth
);
createRoute(router, "get", "/block", retrieveBlockedUsers,checkAuth);
createRoute(router, "put", "/block/:id", blockOtherUser,checkAuth);
createRoute(router,"put", "/unblock/:id", unblockOtherUser, checkAuth);
createRoute(router, "post", "/", insertUser);
createRoute(router, "get", "/", retrieveUser, checkAuth);
createRoute(router, "get", "/:id", retrieveUserById, checkAuth);
createRoute(router, "put", "/:id", modifyUser, checkAuth);
createRoute(router, "delete", "/:id", removeUser, checkAuth);

module.exports = router;
