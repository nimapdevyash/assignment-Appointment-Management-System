const db = require("../models");
const {
  ValidationError,
  DataNotFoundError,
  BadRequestError,
} = require("../../utils/customError");
const { handleSuccess } = require("../../utils/successHandler");

// Helper function to validate user data
const validateUserData = (userData) => {
  const { firstName, lastName, password, userName, email, mobileNumber, role } = userData;
  if (!firstName || !lastName || !password || !userName || !email || !mobileNumber || !role) {
    throw new ValidationError("All user fields are required");
  }
};

exports.createUser = async (userData) => {
  validateUserData(userData); // Validate input data

  const userCreated = await db.user.create(userData);
  if (!userCreated) throw new BadRequestError("Failed to create user");

  // Convert to plain JS object and remove password
  const userObj = userCreated.toObject();
  delete userObj.password;

  return handleSuccess("User created successfully", userObj);
};

exports.fetchUserDetails = async () => {
  const users = await db.user.find();
  if (users && users.length) {
    return handleSuccess("Users found", users);
  }
  throw new DataNotFoundError("No users found");
};

exports.fetchUserById = async (_id) => {
  if (!_id) throw new ValidationError("User ID is required");

  const user = await db.user.findOne({ _id });
  if (!user) throw new DataNotFoundError(`No user found with ID ${_id}`);

  return handleSuccess("User found", user);
};

exports.updateUserById = async (_id, body) => {
  if (!_id) throw new ValidationError("User ID is required");

  const { firstName, lastName, userName, email, mobileNumber, role } = body;

  // Ensure user data is provided and validated
  validateUserData(body);

  const updatedUser = await db.user.findOneAndUpdate(
    { _id },
    { firstName, lastName, userName, email, mobileNumber, role },
    { new: true }
  );

  if (!updatedUser) throw new DataNotFoundError(`No user found with ID ${_id}`);

  return handleSuccess("User updated successfully", updatedUser);
};

exports.deleteUserById = async (_id) => {
  if (!_id) throw new ValidationError("User ID is required");

  const removedUser = await db.user.findOneAndUpdate(
    { _id },
    { deletedAt: new Date() },
    { new: true, projection: { email: 1 } }
  );

  if (!removedUser) throw new DataNotFoundError(`No user found with ID ${_id}`);

  return handleSuccess("User deleted successfully", removedUser);
};

exports.handleMeetingInvitation = async (meetingId, userId, body) => {
  if (!meetingId || !userId || !body.status) {
    throw new ValidationError("Meeting ID, User ID, and status are required");
  }

  const updatedMeeting = await db.meeting.findOneAndUpdate(
    { _id: meetingId, "attendeesStatus.attendee": userId },
    { $set: { "attendeesStatus.$.status": body.status } },
    { new: true, runValidators: true }
  );

  if (!updatedMeeting) {
    throw new BadRequestError("You are not invited to the given meeting");
  }

  return handleSuccess(`Invitation for meeting ${updatedMeeting.title} has been ${body.status}`, updatedMeeting);
};

exports.blockUser = async (userId, userToBlock) => {
  if (!userId || !userToBlock) throw new ValidationError("User ID and user to block are required");

  const user = await db.user.findOne({ _id: userId });
  if (!user) throw new DataNotFoundError(`No user found with ID ${userId}`);

  if (!user.blockedUser.includes(userToBlock)) {
    user.blockedUser.push(userToBlock);
    await user.save();
  }

  return handleSuccess("User blocked successfully");
};

exports.unblockUser = async (userId, userToUnblock) => {
  if (!userId || !userToUnblock) throw new ValidationError("User ID and user to unblock are required");

  const user = await db.user.findOne({ _id: userId });
  if (!user) throw new DataNotFoundError(`No user found with ID ${userId}`);

  const index = user.blockedUser.indexOf(userToUnblock);
  if (index === -1) throw new BadRequestError("User is not blocked");

  user.blockedUser.splice(index, 1);
  await user.save();

  return handleSuccess("User unblocked successfully");
};
