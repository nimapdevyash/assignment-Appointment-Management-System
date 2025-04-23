const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Get the current file name to avoid re-importing itself
const basename = path.basename(__filename);

// Dynamically load all route files in this directory
fs.readdirSync(__dirname)
  .filter((file) => {
    // Only include JS files that aren't this file and aren't hidden
    return (
      file.endsWith(".js") &&
      file !== basename &&
      !file.startsWith(".")
    );
  })
  .forEach((file) => {
    try {
      // Extract route name (e.g., "users.js" → "users")
      const routeName = path.basename(file, ".js").toLowerCase();

      // Import the route file
      const routeModule = require(path.join(__dirname, file));

      if (!routeModule || typeof routeModule !== "function" && typeof routeModule.use !== "function") {
        console.warn(`⚠️ Skipped route '${file}' — it does not export a valid router.`);
        return;
      }

      // Mount the route
      router.use(`/${routeName}`, routeModule);
      console.log(`✅ Loaded route: /${routeName}`);
    } catch (error) {
      console.error(`❌ Error loading route file: ${file}`);
      console.error(error);
    }
  });

module.exports = router;
