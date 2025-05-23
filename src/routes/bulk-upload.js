const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");
const { insertBulkUpload, getFile } = require("../controllers/bulkUpload");
const { upload } = require("../../utils/upload");
const createRoute = require("../../utils/createRoute");

createRoute(router , "get" , "/" , getFile , checkAuth)
createRoute(router , "post" , "/" , insertBulkUpload , [checkAuth , upload])

module.exports = router;
