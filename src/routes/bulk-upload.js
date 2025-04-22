const express = require("express");
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");
const { insertBulkUpload, getFile } = require("../controllers/bulkUpload");
const { upload } = require("../../utils/upload");

const router = express.Router();

// Route to retrieve the bulk uploaded file
router.get("/", checkAuth, checkPermission, errorWrapper(getFile));

// Route to handle the bulk upload of files
router.post(
  "/",
  checkAuth,
  checkPermission,
  upload,
  errorWrapper(insertBulkUpload)
);

module.exports = router;
