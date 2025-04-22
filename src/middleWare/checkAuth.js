const jwt = require("jsonwebtoken");
const db = require("../models");
const response = require("../../utils/response");
const client = require("../../config/redis");

module.exports = async (req, res, next) => {
  try {
    // Check if the authorization header exists
    const checkToken = req.headers.authorization;
    if (!checkToken) {
      return response.unauthorized(res, "Authorization token is missing.");
    }

    // Extract token from the header
    let token = checkToken.split(" ")[1];
    if (!token) {
      return response.unauthorized(res, "Token is missing.");
    }

    // Check Redis for the token
    const redisToken = await client.get(token);
    if (redisToken) {
      console.log("Token found in Redis");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Validate token and set user to request object
      if (decoded) {
        req.user = { id: decoded.userId };
        return next();
      } else {
        console.log("Invalid token in Redis");
        return response.unauthorized(res, "Invalid token.");
      }
    }

    // If not in Redis, verify the token normally
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return response.unauthorized(res, "Invalid token.");
    }

    // Set token in Redis with expiration (1 hour)
    await client.setEx(token, 3600, JSON.stringify(decoded));
    console.log("Set token in Redis");

    // Check if the token exists in the database
    const findInDb = await db.userToken.findOne({ token });
    if (!findInDb) {
      return response.unauthorized(res, "Token not found in the database.");
    }

    // Retrieve user details based on decoded userId
    const userDetails = await db.user.findOne({ _id: decoded.userId });
    if (!userDetails) {
      return response.unauthorized(res, "User not found.");
    }

    req.user = { id: userDetails._id };
    return next();
  } catch (err) {
    console.error(err);
    return response.unauthorized(
      res,
      "An error occurred during authentication."
    );
  }
};
