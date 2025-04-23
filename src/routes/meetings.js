const express = require("express");
const router = express.Router();
const createRoute = require("../../utils/createRoute");
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");

const {
  insertMeeting,
  fetchAllMeetings,
  fetchMeetingById,
  fetchUserMeetings,
  removeMeetingById,
  generateMontlyReport,
  generateCustomDateReport,
  exportMeetings,
} = require("../controllers/meeting");

// Register routes
createRoute(router, "post", "/", insertMeeting, [checkAuth, checkPermission]);
createRoute(router, "get", "/report/monthly", generateMontlyReport, [
  checkAuth,
  checkPermission,
]);
createRoute(router, "get", "/export", exportMeetings, [
  checkAuth,
  checkPermission,
]);
createRoute(router, "get", "/report/custom-date", generateCustomDateReport, [
  checkAuth,
  checkPermission,
]);
createRoute(router, "get", "/my-meetings", fetchUserMeetings),
  [checkAuth, checkPermission];
createRoute(router, "get", "/", fetchAllMeetings, [checkAuth, checkPermission]);
createRoute(router, "get", "/:id", fetchMeetingById, [
  checkAuth,
  checkPermission,
]);
createRoute(router, "delete", "/:id", removeMeetingById, [
  checkAuth,
  checkPermission,
]);

module.exports = router;
