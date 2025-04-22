const path = require("path");

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,

  // Paths
  paths: {
    uploads: path.resolve(__dirname, "../public/uploads"),
    public: path.resolve(__dirname, "../public"),
  },
};
