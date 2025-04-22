const db = require("../models");
const {
  ValidationError,
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

// Create Entity
exports.createEntity = async (body) => {
  const { name, description } = body;

  if (!name) {
    throw new ValidationError("Entity name is required.");
  }

  const entity = await db.entity.create({ name, description });

  if (!entity) {
    throw new BadRequestError("Failed to create entity.");
  }

  return handleSuccess("Entity created successfully", entity);
};

// Fetch All Entities
exports.fetchEntityDetails = async () => {
  const entities = await db.entity.find({ deletedAt: { $exists: false } });

  if (!entities.length) {
    throw new DataNotFoundError("No entities found.");
  }

  return handleSuccess("Entities fetched successfully", entities);
};

// Fetch Entity by ID
exports.fetchEntityById = async (_id) => {
  const entity = await db.entity.findOne({ _id, deletedAt: { $exists: false } });

  if (!entity) {
    throw new DataNotFoundError(`No entity found with ID: ${_id}`);
  }

  return handleSuccess("Entity fetched successfully", entity);
};

// Update Entity by ID
exports.updateEntityById = async (_id, { name, description }) => {
  const updatedEntity = await db.entity.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    { name, description },
    { new: true }
  );

  if (!updatedEntity) {
    throw new DataNotFoundError(`No entity found with ID: ${_id}`);
  }

  return handleSuccess("Entity updated successfully", updatedEntity);
};

// Soft Delete Entity by ID
exports.deleteEntityById = async (_id) => {
  const deletedEntity = await db.entity.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!deletedEntity) {
    throw new DataNotFoundError(`No entity found with ID: ${_id}`);
  }

  return handleSuccess("Entity deleted successfully", deletedEntity);
};
