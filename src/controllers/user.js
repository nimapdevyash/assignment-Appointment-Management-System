const {
  createUser,
  fetchUserDetails,
  fetchUserById,
  updateUserById,
  deleteUserById,
  handleMeetingInvitation,
  blockUser,
  unblockUser,
  fetchAllBlockedUsers,
} = require("../services/user");
const response = require("../../utils/response");

exports.insertUser = async (req, res) => {
  try {
    const result = await createUser(req.body);
    return response.created(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while creating the user.");
  }
};

exports.retrieveUser = async (req, res) => {
  try {
    const result = await fetchUserDetails();
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while fetching user details.");
  }
};

exports.retrieveUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await fetchUserById(id);

    // Handle case where user isn't found
    if (!result) {
      return response.dataNotFound(res, `No user found with ID ${id}`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while fetching user with ID ${id}`);
  }
};

exports.modifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await updateUserById(id, req.body);

    // Handle case where user isn't found for update
    if (!result) {
      return response.dataNotFound(res, `No user found with ID ${id} to update.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while updating user with ID ${id}`);
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteUserById(id);

    // Handle case where user isn't found for deletion
    if (!result) {
      return response.dataNotFound(res, `No user found with ID ${id} to delete.`);
    }

    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while deleting user with ID ${id}`);
  }
};

exports.handleMeetingInvite = async (req, res) => {
  const { meetingId } = req.params;
  const userId = req["user"].id;
  try {
    const result = await handleMeetingInvitation(meetingId, userId, req.body);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, "An error occurred while handling the meeting invitation.");
  }
};

exports.blockOtherUser = async (req, res) => {
  const { id } = req.params;
  const userId = req["user"].id;
  try {
    const result = await blockUser(userId, id);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while blocking user with ID ${id}`);
  }
};

exports.retrieveBlockedUsers = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await fetchAllBlockedUsers(userId);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while retrieveing blocked users by : ${id}`);
  }
};

exports.unblockOtherUser = async (req, res) => {
  const { id } = req.params;
  const userId = req["user"].id;
  try {
    const result = await unblockUser(userId, id);
    return response.ok(res, result);
  } catch (error) {
    console.error(error);
    return response.serverError(res, `An error occurred while unblocking user with ID ${id}`);
  }
};
