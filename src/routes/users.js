const express = require("express");
const router = express.Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");

const {
  insertUser,
  retrieveUser,
  retrieveUserById,
  modifyUser,
  removeUser,
  handleMeetingInvite,
  blockOtherUser,
  unblockOtherUser,
} = require("../controllers/user");

// Helper function to register routes dynamically
const createRoute = (method, path, middleware, handler) => {
  router[method](path, middleware, errorWrapper(handler));
};

// Register routes
createRoute('post', '/handle-invite/:meetingId', checkAuth, handleMeetingInvite);
createRoute('put', '/block/:id', [checkAuth, checkPermission], blockOtherUser);
createRoute('put', '/unblock/:id', [checkAuth, checkPermission], unblockOtherUser);
createRoute('post', '/', null, insertUser);
createRoute('get', '/', checkAuth, retrieveUser);
createRoute('get', '/:id', checkAuth, retrieveUserById);
createRoute('put', '/:id', checkAuth, modifyUser);
createRoute('delete', '/:id', checkAuth, removeUser);

module.exports = router;
