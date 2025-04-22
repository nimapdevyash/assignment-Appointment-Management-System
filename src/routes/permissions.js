const express = require("express");
const router = express.Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");

const {
  insertPermission,
  retrievePermission,
  retrievePermissionById,
  modifyPermission,
  removePermission,
} = require("../controllers/permission");

// Helper function to register routes dynamically
const createRoute = (method, path, handler) => {
  router[method](path, checkAuth, errorWrapper(handler));
};

// Register routes
createRoute('post', '/', insertPermission);
createRoute('get', '/', retrievePermission);
createRoute('get', '/:id', retrievePermissionById);
createRoute('put', '/:id', modifyPermission);
createRoute('delete', '/:id', removePermission);

module.exports = router;
