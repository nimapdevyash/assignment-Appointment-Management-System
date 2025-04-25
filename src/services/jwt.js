const jwt = require("jsonwebtoken");

function createAcessToken(user , options = {expiresIn: process.env.EXPIRES_IN || "12h"}) {
  try {
    const token = jwt.sign(user , process.env.JWT_SECRET , options )
    return token;
  } catch (error) {
    console.log("token is not created ", error);
  }
}

function verifyAcessToken(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      throw new Error("invalid token");
    }

    return decodedToken;
  } catch (error) {
    console.log("couldn't verify token ", error);
  }
}

module.exports = { createAcessToken, verifyAcessToken };
