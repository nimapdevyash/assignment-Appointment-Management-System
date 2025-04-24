const db = require("../models");
const response = require("../../utils/response");
const { client } = require("../../config/redis");
const { verifyAcessToken } = require("../services/jwt");
const { use } = require("../routes/auth");

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
    const decoded = verifyAcessToken(token);

    if (!decoded || !decoded.userId) {
      return response.unauthorized(res, "Invalid token.");
    }

    // Check Redis first
    const redisToken = await client.get(decoded.userId);
    if (!redisToken) {
      return response.unauthorized(res, "Token expired or logged out.");
    }

    if(redisToken !== token) {
      return response.unauthorized(res, "Invalid Token");
    }

    // Attach user ID to request
    req.user = { id: decoded.userId };
    next();

  } catch (err) {
    console.error("Auth Error:", err.message);
    return response.unauthorized(res, "Authentication failed.");
  }
};
