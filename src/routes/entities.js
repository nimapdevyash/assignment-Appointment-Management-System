const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");

const {
  insertEntity,
  retrieveEntity,
  retrieveEntityById,
  modifyEntity,
  removeEntity,
} = require("../controllers/entity");
const createRoute = require("../../utils/createRoute");


// CRUD routes
createRoute(router,"get", "/", retrieveEntity , [checkAuth, checkPermission]);
createRoute(router,"post", "/", insertEntity, [checkAuth, checkPermission]);
createRoute(router,"get", "/:id", retrieveEntityById, [checkAuth, checkPermission]);
createRoute(router,"put", "/:id", modifyEntity, [checkAuth, checkPermission]);
createRoute(router,"delete", "/:id", removeEntity, [checkAuth, checkPermission]);

module.exports = router;
