const db = require("../models");
const {
  ValidationError,
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

// Helper function to validate required fields
const validateRoleData = (roleData) => {
  const { name, description } = roleData;
  if (!name) throw new ValidationError("Role name is required");
  if (!description) throw new ValidationError("Role description is required");
};

exports.createRole = async (roleData) => {
  validateRoleData(roleData); // Validate input data

  const roleCreated = await db.role.create(roleData);
  if (!roleCreated) throw new BadRequestError("Failed to create role");

  return handleSuccess("Role created successfully", roleCreated);
};

exports.fetchRoleDetails = async () => {
  const roles = await db.role.find().lean().populate("permissions");
  if (roles && roles.length) {
    return handleSuccess("Roles found", roles);
  }
  throw new DataNotFoundError("No roles found");
};

exports.fetchRoleById = async (_id) => {
  if (!_id) throw new ValidationError("Role ID is required");

  const role = await db.role
    .findOne({ _id, deletedAt: { $exists: false } })
    .lean()
    .populate("permissions");

  if (!role) throw new DataNotFoundError(`No role found with ID ${_id}`);

  return handleSuccess("Role found", role);
};

exports.updateRoleById = async (_id, body) => {
  if (!_id) throw new ValidationError("Role ID is required");

  const { name, description, permissions } = body;

  validateRoleData(body); // Validate input data

  const updatedRole = await db.role.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    { name, description, permissions },
    { new: true }
  );

  if (!updatedRole) throw new DataNotFoundError(`No role found with ID ${_id}`);

  return handleSuccess("Role updated successfully", updatedRole);
};

exports.deleteRoleById = async (_id) => {
  if (!_id) throw new ValidationError("Role ID is required");

  const removedRole = await db.role.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!removedRole) throw new DataNotFoundError(`No role found with ID ${_id}`);

  return handleSuccess("Role deleted successfully", removedRole);
};
