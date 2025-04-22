const {
  createRole,
  fetchRoleDetails,
  fetchRoleById,
  updateRoleById,
  deleteRoleById,
} = require("../services/role");
const response = require("../../utils/response");

exports.insertRole = async (req, res) => {
  try {
    const result = await createRole(req.body);
    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while creating the role.");
  }
};

exports.retrieveRole = async (req, res) => {
  try {
    const result = await fetchRoleDetails();
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while fetching role details.");
  }
};

exports.retrieveRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await fetchRoleById(id);

    // Handle case where role isn't found
    if (!result) {
      return response.dataNotFound(res, `No role found with ID ${id}`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while fetching role with ID ${id}`);
  }
};

exports.modifyRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateRoleById(id, req.body);

    // Handle case where role isn't found for update
    if (!result) {
      return response.dataNotFound(res, `No role found with ID ${id} to update.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while updating role with ID ${id}`);
  }
};

exports.removeRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteRoleById(id);

    // Handle case where role isn't found for deletion
    if (!result) {
      return response.dataNotFound(res, `No role found with ID ${id} to delete.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while deleting role with ID ${id}`);
  }
};
