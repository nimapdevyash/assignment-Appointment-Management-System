const {
  createPermission,
  fetchPermissionDetails,
  fetchPermissionById,
  updatePermissionById,
  deletePermissionById,
} = require("../services/permission");
const response = require("../../utils/response");

exports.insertPermission = async (req, res) => {
  try {
    const result = await createPermission(req.body);
    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while creating the permission.");
  }
};

exports.retrievePermission = async (req, res) => {
  try {
    const result = await fetchPermissionDetails();
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while fetching permission details.");
  }
};

exports.retrievePermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await fetchPermissionById(id);

    // Handle case where permission isn't found
    if (!result) {
      return response.dataNotFound(res, `No permission found with ID ${id}`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while fetching permission with ID ${id}`);
  }
};

exports.modifyPermission = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updatePermissionById(id, req.body);

    // Handle case where permission isn't found for update
    if (!result) {
      return response.dataNotFound(res, `No permission found with ID ${id} to update.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while updating permission with ID ${id}`);
  }
};

exports.removePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deletePermissionById(id);

    // Handle case where permission isn't found for deletion
    if (!result) {
      return response.dataNotFound(res, `No permission found with ID ${id} to delete.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while deleting permission with ID ${id}`);
  }
};
