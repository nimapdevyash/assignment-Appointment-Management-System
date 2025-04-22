const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Get the current file name (index.js) to avoid importing it
const basename = path.basename(__filename);

// Dynamically load routes
fs.readdirSync(__dirname)
  .filter((file) => {
    // Ensure the file is a JavaScript file and not the current file or a hidden file
    return file.endsWith(".js") && file !== basename && !file.startsWith(".");
  })
  .forEach((file) => {
    // Extract the model name from the filename (e.g., "entity.js" => "entity")
    const routeName = path.basename(file, ".js").toLowerCase();

    // Define the route dynamically based on the filename
    const route = require(path.join(__dirname, file));

    // Set the main route as the lowercase of the model name
    const mainRoute = `/${routeName}`;

    // Dynamically use the route module for the current path
    router.use(mainRoute, route);
  });

module.exports = router;
