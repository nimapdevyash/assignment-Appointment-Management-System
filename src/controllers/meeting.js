const response = require("../../utils/response");
const moment = require("moment");
const {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  deleteMeetingById,
  getUserMeetings,
  generateMonthlyReportForMeetings,
  generateReportForCustomDate,
  exportUserMeetings,
} = require("../services/meeting");
const db = require("../models");

exports.insertMeeting = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await createMeeting(req.body, userId);
    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while creating the meeting.");
  }
};

exports.fetchAllMeetings = async (req, res) => {
  try {
    const result = await getAllMeetings();
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while fetching all meetings.");
  }
};

exports.fetchMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getMeetingById(id);

    // Handle not found
    if (!result) {
      return response.dataNotFound(res, `No meeting found with ID ${id}`);
    }

    // Optional logging for debugging purposes
    console.log(
      `reqPath: ${req.path}\nreqBaseUrl: ${req.baseUrl}\nreqEnfpoint: ${req.route.path}\nrmethod: ${req.method}`
    );
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while fetching meeting with ID ${id}`);
  }
};

exports.removeMeetingById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteMeetingById(id);

    // Handle not found
    if (!result) {
      return response.dataNotFound(res, `No meeting found with ID ${id} to delete.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while deleting meeting with ID ${id}`);
  }
};

exports.fetchUserMeetings = async (req, res) => {
  const userId = req["user"].id;
  try {
    const result = await getUserMeetings(userId);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while fetching user meetings.");
  }
};

exports.generateMontlyReport = async (req, res) => {
  try {
    const result = await generateMonthlyReportForMeetings();
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while generating the monthly report.");
  }
};

exports.generateCustomDateReport = async (req, res) => {
  try {
    const result = await generateReportForCustomDate(req.query);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while generating the custom date report.");
  }
};

exports.exportMeetings = async (req, res) => {
  try {
    const result = await exportUserMeetings(req.query, req);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while exporting meetings.");
  }
};
