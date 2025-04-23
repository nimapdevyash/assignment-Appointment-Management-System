const httpStatus = require("http-status");

// Standard response sender
const sendResponse = (res, statusCode, message) => {
  return res.status(statusCode).send({ statusCode, message });
};

module.exports = {
  ok: (res,  message = "Data found" ) =>
    sendResponse(res, httpStatus.OK, message),

  created: (res, message = "Data inserted" ) =>
    sendResponse(res, httpStatus.CREATED, message),

  badRequest: (res, message = "Bad request" ) =>
    sendResponse(res, httpStatus.BAD_REQUEST, message),

  noData: (res, message = "No data found" ) =>
    sendResponse(res, httpStatus.NOT_FOUND, message),

  noContent: (res, message = "No content" ) =>
    sendResponse(res, httpStatus.NO_CONTENT, message),

  unauthorized: (res,  message = "Unauthorized" ) =>
    sendResponse(res, httpStatus.UNAUTHORIZED, message),

  unprocessableEntity: (res, message = "Unprocessable Entity" ) =>
    sendResponse(res, httpStatus.UNPROCESSABLE_ENTITY, message),

  serverError: (res, message = "Internal server error" ) =>
    sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, message),
};
