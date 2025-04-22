const ExcelJS = require("exceljs");
const moment = require("moment");
const path = require("path");
const db = require("../models/index");
const { filePath } = require("../../utils/constant");
const { BadRequestError, DataNotFoundError } = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

exports.createMeeting = async (body, userId) => {
  const { title, attendees, date, time, attendeesStatus } = body;

  if (!Array.isArray(attendees) || !Array.isArray(attendeesStatus)) {
    throw new BadRequestError("Attendees and attendeesStatus must be arrays");
  }

  if (attendees.length !== attendeesStatus.length) {
    throw new BadRequestError("Number of attendees and statuses must match");
  }

  if (!await isSlotAvailable(userId, date, time)) {
    throw new BadRequestError("Slot is not available");
  }

  const meeting = await db.meeting.create({
    title,
    createdBy: userId,
    date: moment(date, "M/D/YYYY").toDate(),
    time: formatTime(`${date} ${time}`),
    attendees,
    attendeesStatus,
  });

  if (!meeting) throw new BadRequestError("Failed to create a meeting");
  return handleSuccess("New meeting created successfully", meeting);
};

exports.getAllMeetings = async () => {
  const meetings = await db.meeting.find({})
    .populate("createdBy", "firstName lastName userName email")
    .populate("attendees", "firstName lastName userName email");

  return handleSuccess("All meetings fetched successfully", meetings);
};

exports.getMeetingById = async (id) => {
  const meeting = await db.meeting.findById(id)
    .populate("createdBy")
    .populate("attendees");

  if (!meeting) throw new DataNotFoundError("Meeting not found");
  return handleSuccess("Meeting fetched successfully", meeting);
};

exports.deleteMeetingById = async (id) => {
  const meeting = await db.meeting.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );

  if (!meeting) throw new DataNotFoundError("Meeting not found");
  return handleSuccess("Meeting deleted successfully", meeting);
};

exports.getUserMeetings = async (userId) => {
  const meetings = await db.meeting.find({ createdBy: userId })
    .populate("createdBy")
    .populate("attendees");

  return handleSuccess("Your meetings are fetched successfully", meetings);
};

exports.generateMonthlyReportForMeetings = async () => {
  const now = moment();
  const startDate = now.clone().startOf("month").toDate();
  const endDate = now.clone().endOf("month").toDate();

  const scheduledMeetings = await db.meeting.find({
    date: { $gte: startDate, $lte: endDate }
  });

  const attendedMeetings = await db.meeting.find({
    date: { $gte: startDate, $lte: endDate },
    "attendeesStatus.status": "Accepted",
  });

  return handleSuccess("Monthly report generated successfully", {
    scheduledMeetings: scheduledMeetings.length,
    attendedMeetings: attendedMeetings.length,
    month: now.month(),
  });
};

exports.generateReportForCustomDate = async ({ startDate, endDate }) => {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);

  const scheduledMeetings = await db.meeting.find({
    date: { $gte: sDate, $lte: eDate },
  });

  const attendedMeetings = await db.meeting.find({
    date: { $gte: sDate, $lte: eDate },
    "attendeesStatus.status": "Accepted",
  });

  return handleSuccess("Report generated successfully", {
    scheduledMeetings: scheduledMeetings.length,
    attendedMeetings: attendedMeetings.length,
  });
};

exports.exportUserMeetings = async ({ startDate, endDate }, req) => {
  const userId = req.user.id;
  const sDate = new Date(startDate || "01/01/1900");
  const eDate = new Date(endDate || "12/31/2025");

  const meetings = await db.meeting.find({
    $or: [{ createdBy: userId }, { attendees: userId }],
    "attendeesStatus.status": "Accepted",
  }).populate("attendees");

  if (!meetings.length) throw new DataNotFoundError("No meetings found to export");

  const filteredMeetings = meetings.filter(({ date }) => date >= sDate && date <= eDate);

  const data = filteredMeetings.map(({ _id, title, date, time, attendees }) => ({
    id: _id,
    title,
    date,
    time,
    attendees: attendees.map(({ firstName, lastName }) => `${firstName} ${lastName}`).join(", ")
  }));

  const file = await addDataToXlsx(data);
  return handleSuccess("Successfully exported meetings", file);
};

async function addDataToXlsx(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Meetings");

  worksheet.columns = [
    { header: "Meeting ID", key: "id", width: 20 },
    { header: "Title", key: "title", width: 20 },
    { header: "Date", key: "date", width: 20 },
    { header: "Time", key: "time", width: 20 },
    { header: "Attendees", key: "attendees", width: 30 },
  ];

  worksheet.addRows(data);

  const fileName = `meetingsexport-${Date.now()}.xlsx`;
  const outputPath = path.join(filePath, "exports", fileName);
  await workbook.xlsx.writeFile(outputPath);

  return `${process.env.URL}/exports/${fileName}`;
}

async function isSlotAvailable(userId, date, time) {
  const meetings = await db.meeting.find({
    createdBy: userId,
    date: moment(date, "M/D/YYYY").startOf("day").toDate(),
  });

  const providedStart = moment(`${date} ${time}`, "M/D/YYYY h:mm A");
  const providedEnd = providedStart.clone().add(30, "minutes");

  return meetings.every(({ time: meetTime }) => {
    const meetStart = moment(`${date} ${meetTime}`, "M/D/YYYY h:mm A");
    const meetEnd = meetStart.clone().add(30, "minutes");

    return (
      providedEnd.isSameOrBefore(meetStart) ||
      providedStart.isSameOrAfter(meetEnd)
    );
  });
}

function formatTime(dateTime) {
  return moment(dateTime, "M/D/YYYY HH:mm:ss").format("h:mm A");
}
