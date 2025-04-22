const httpStatus = require("http-status");

/**
 * Standard response sender
 * @param {Object} res - Express.js response object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} options - Response payload (message, data, etc.)
 */
const sendResponse = (res, statusCode, options) => {
  return res.status(statusCode).send({ statusCode, ...options });
};

module.exports = {
  ok: (res, options = { message: "Data found" }) =>
    sendResponse(res, httpStatus.OK, options),

  created: (res, options = { message: "Data inserted" }) =>
    sendResponse(res, httpStatus.CREATED, options),

  badRequest: (res, options = { message: "Bad request" }) =>
    sendResponse(res, httpStatus.BAD_REQUEST, options),

  noData: (res, options = { message: "No data found" }) =>
    sendResponse(res, httpStatus.NOT_FOUND, options),

  noContent: (res, options = { message: "No content" }) =>
    sendResponse(res, httpStatus.NO_CONTENT, options),

  unauthorized: (res, options = { message: "Unauthorized" }) =>
    sendResponse(res, httpStatus.UNAUTHORIZED, options),

  unprocessableEntity: (res, options = { message: "Unprocessable Entity" }) =>
    sendResponse(res, httpStatus.UNPROCESSABLE_ENTITY, options),
};
