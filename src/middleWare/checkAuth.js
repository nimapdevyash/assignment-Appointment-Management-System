const jwt = require("jsonwebtoken");
const db = require("../models");
const response = require("../../utils/response");
const { client } = require("../../config/redis");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return response.unauthorized(res, "Authorization token is missing.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return response.unauthorized(res, "Token is missing.");
    }

    // Validate JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return response.unauthorized(res, "Invalid token.");
    }

    // Check Redis first
    const redisValue = await client.get(token);
    if (!redisValue) {
      return response.unauthorized(res, "Token expired or logged out.");
    }

    // Check token in DB
    const dbToken = await db.userToken.findOne({ token });
    if (!dbToken) {
      await client.del(token); // Clean up redis if token was manually removed from DB
      return response.unauthorized(res, "Token not found in database.");
    }

    // Attach user ID to request
    req.user = { id: decoded.userId };
    next();

  } catch (err) {
    console.error("Auth Error:", err.message);
    return response.unauthorized(res, "Authentication failed.");
  }
};
