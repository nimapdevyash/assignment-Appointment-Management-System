const express = require("express");
const router = express.Router();
const createRoute = require("../../utils/createRoute")
const checkAuth = require("../middleWare/checkAuth");

const {
  insertRole,
  retrieveRole,
  retrieveRoleById,
  modifyRole,
  removeRole,
} = require("../controllers/role");


// Register routes
createRoute(router,'post', '/', insertRole , checkAuth);
createRoute(router,'get', '/', retrieveRole , checkAuth);
createRoute(router,'get', '/:id', retrieveRoleById, checkAuth);
createRoute(router,'put', '/:id', modifyRole, checkAuth);
createRoute(router,'delete', '/:id', removeRole, checkAuth);

module.exports = router;
