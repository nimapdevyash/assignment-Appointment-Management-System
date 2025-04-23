const express = require("express");
const router = express.Router();
const createRoute = require("../../utils/createRoute");
const checkAuth = require("../middleWare/checkAuth");

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
createRoute(router, "post", "/", insertMeeting, checkAuth);
createRoute(router, "get", "/report/monthly", generateMontlyReport,  checkAuth);
createRoute(router, "get", "/export", exportMeetings, checkAuth);
createRoute(router, "get", "/report/custom-date", generateCustomDateReport, checkAuth);
createRoute(router, "get", "/my-meetings", fetchUserMeetings , checkAuth);
createRoute(router, "get", "/", fetchAllMeetings, checkAuth);
createRoute(router, "get", "/:id", fetchMeetingById, checkAuth);
createRoute(router, "delete", "/:id", removeMeetingById, checkAuth);

module.exports = router;
