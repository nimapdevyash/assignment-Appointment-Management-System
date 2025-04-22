const db = require("../models");

exports.checkPermission = async (req, res, next) => {
  try {
    // Fetch user data and associated role and permissions in a single query
    const user = await db.user
      .findOne({ _id: req.user.id })
      .populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      })
      .lean();

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the role has the required permission
    const hasPermission = user.role.permissions.some(permission => 
      permission.method === req.method &&
      permission.baseUrl === req.baseUrl &&
      permission.path === req.route.path
    );

    // Deny access if permission doesn't exist
    if (!hasPermission) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Proceed to the next middleware if permission is granted
    next();
  } catch (err) {
    console.error("Error checking permission: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
