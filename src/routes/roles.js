const express = require("express");
const router = express.Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");

const {
  insertRole,
  retrieveRole,
  retrieveRoleById,
  modifyRole,
  removeRole,
} = require("../controllers/role");

// Helper function to register routes dynamically
const createRoute = (method, path, handler) => {
  router[method](path, checkAuth, errorWrapper(handler));
};

// Register routes
createRoute('post', '/', insertRole);
createRoute('get', '/', retrieveRole);
createRoute('get', '/:id', retrieveRoleById);
createRoute('put', '/:id', modifyRole);
createRoute('delete', '/:id', removeRole);

module.exports = router;
