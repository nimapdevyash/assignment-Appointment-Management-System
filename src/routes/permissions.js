const express = require("express");
const router = express.Router();
const createRoute = require("../../utils/createRoute")
const checkAuth = require("../middleWare/checkAuth");

const {
  insertPermission,
  retrievePermission,
  retrievePermissionById,
  modifyPermission,
  removePermission,
} = require("../controllers/permission");


// Register routes
createRoute(router,'post', '/', insertPermission, checkAuth);
createRoute(router,'get', '/', retrievePermission, checkAuth);
createRoute(router,'get', '/:id', retrievePermissionById, checkAuth);
createRoute(router,'put', '/:id', modifyPermission, checkAuth);
createRoute(router,'delete', '/:id', removePermission, checkAuth);

module.exports = router;
