const express = require("express");
const router = express.Router();
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");
const { errorWrapper } = require("../../utils/errorWrapper");

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

// Helper function to register routes dynamically
const createRoute = (method, path, handler) => {
  router[method](path, checkAuth, checkPermission, errorWrapper(handler));
};

// Register routes
createRoute('post', '/', insertMeeting);
createRoute('get', '/report/monthly', generateMontlyReport);
createRoute('get', '/export', exportMeetings);
createRoute('get', '/report/custom-date', generateCustomDateReport);
createRoute('get', '/get-meetings', fetchUserMeetings);
createRoute('get', '/', fetchAllMeetings);
createRoute('get', '/:id', fetchMeetingById);
createRoute('delete', '/:id', removeMeetingById);

module.exports = router;
