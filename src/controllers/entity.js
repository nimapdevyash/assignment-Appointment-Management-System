const {
  createEntity,
  fetchEntityDetails,
  fetchEntityById,
  updateEntityById,
  deleteEntityById,
} = require("../services/entity");
const response = require("../../utils/response");

exports.insertEntity = async (req, res) => {
  try {
    const result = await createEntity(req.body);

    // Ensure result is valid
    if (!result) {
      return response.badRequest(res, "Failed to create entity.");
    }

    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while creating the entity."
    );
  }
};

exports.retrieveEntity = async (req, res) => {
  try {
    const result = await fetchEntityDetails();

    // Ensure result is found
    if (!result || result.length === 0) {
      return response.dataNotFound(res, "No entities found.");
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      "An error occurred while retrieving entities."
    );
  }
};

exports.retrieveEntityById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await fetchEntityById(id);

    // Handle not found
    if (!result) {
      return response.dataNotFound(res, `No entity found with ID ${id}`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      `An error occurred while retrieving entity with ID ${id}.`
    );
  }
};

exports.modifyEntity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await updateEntityById(id, req.body);

    // Handle not found or failure to update
    if (!result) {
      return response.badRequest(res, `Failed to update entity with ID ${id}.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      `An error occurred while updating entity with ID ${id}.`
    );
  }
};

exports.removeEntity = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteEntityById(id);

    // Handle not found or failure to delete
    if (!result) {
      return response.dataNotFound(
        res,
        `No entity found with ID ${id} to delete.`
      );
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(
      res,
      `An error occurred while deleting entity with ID ${id}.`
    );
  }
};
