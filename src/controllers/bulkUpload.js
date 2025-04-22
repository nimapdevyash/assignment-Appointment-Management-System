const response = require("../../utils/response");
const { addBulkUpload, getUploadDetails } = require("../services/bulkUpload");

exports.insertBulkUpload = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ensure files are provided in the request
    if (!req.files || req.files.length === 0) {
      return response.badRequest(res, "No files were uploaded.");
    }

    const result = await addBulkUpload(req.files, userId);
    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while uploading the files."
    );
  }
};

exports.getFile = async (req, res) => {
  try {
    const result = await getUploadDetails(req);

    // Ensure result is found
    if (!result) {
      return response.dataNotFound(res, "No upload details found.");
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while fetching upload details."
    );
  }
};
