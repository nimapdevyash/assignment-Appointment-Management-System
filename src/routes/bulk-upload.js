const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");
const { insertBulkUpload, getFile } = require("../controllers/bulkUpload");
const { upload } = require("../../utils/upload");
const createRoute = require("../../utils/createRoute");

createRoute(router , "get" , "/" , getFile , [checkAuth, checkPermission])
createRoute(router , "post" , "/" , insertBulkUpload , [checkAuth, checkPermission , upload])

module.exports = router;
