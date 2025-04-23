const db = require("../models");
const {
  ValidationError,
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

// Helper function for field validation
const validateFields = (body, requiredFields) => {
  for (const field of requiredFields) {
    if (!body[field]) throw new ValidationError(`${field} is required`);
  }
};

exports.createPermission = async (body) => {
  const requiredFields = [
    "entity",
    "actionName",
    "description",
    "baseUrl",
    "path",
    "method",
  ];

  validateFields(body, requiredFields);

  const permission = await db.permission.create(body);
  if (!permission) throw new BadRequestError("Failed to create permission");

  return handleSuccess("Permission created successfully", permission);
};

exports.fetchPermissionDetails = async () => {
  const permissions = await db.permission.find({}, "_id");
  if (!permissions.length) throw new DataNotFoundError("No permissions found");

  const updatedRole = await db.role.findOneAndUpdate(
    { name: "Manager" },
    { permissions },
    { new: true }
  );

  return handleSuccess("Permissions fetched and role updated", {
    permissions,
    roleUpdated: !!updatedRole,
  });
};

exports.fetchPermissionById = async (_id) => {
  if (!_id) throw new ValidationError("Permission ID is required");

  const permission = await db.permission
    .findOne({ _id, deletedAt: { $exists: false } })
    .populate("entity");

  if (!permission)
    throw new DataNotFoundError(`No permission found with ID ${_id}`);

  return handleSuccess("Permission found", permission);
};

exports.updatePermissionById = async (_id, body) => {
  if (!_id) throw new ValidationError("Permission ID is required");

  const updatedPermission = await db.permission.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    body,
    { new: true }
  );

  if (!updatedPermission)
    throw new DataNotFoundError(`No permission found with ID ${_id}`);

  return handleSuccess("Permission updated successfully", updatedPermission);
};

exports.deletePermissionById = async (_id) => {
  if (!_id) throw new ValidationError("Permission ID is required");

  const deletedPermission = await db.permission.findOneAndUpdate(
    { _id, deletedAt: { $exists: false } },
    { deletedAt: new Date() },
    { new: true }
  );

  if (!deletedPermission)
    throw new DataNotFoundError(`No permission found with ID ${_id}`);

  return handleSuccess("Permission deleted successfully", deletedPermission);
};
