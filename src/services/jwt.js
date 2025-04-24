const jwt = require("jsonwebtoken");

function createAcessToken(user) {
  try {
    const token = jwt.sign(user , process.env.JWT_SECRET)
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
