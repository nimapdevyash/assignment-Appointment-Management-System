const fs = require("fs");
const path = require("path");

const modelsDirectory = __dirname;
const indexFile = path.basename(__filename);

const db = {};

// this automates the loading and exporting of all the models
fs.readdirSync(modelsDirectory)
  .filter((file) => {
    const isJSFile = file.endsWith(".js");
    const isNotIndex = file !== indexFile;
    const isNotTest = !file.includes(".test.js");
    const isVisible = !file.startsWith(".");
    return isJSFile && isNotIndex && isNotTest && isVisible;
  })
  .forEach((file) => {
    const modelPath = path.join(modelsDirectory, file);
    const model = require(modelPath);

    // Support both default and named exports
    const exportedModel = model?.modelName ? model : model.default;

    // default export will have filename as a modelname
    const modelName = exportedModel?.modelName || path.basename(file, ".js");

    if (modelName && exportedModel) {
      db[modelName] = exportedModel;
    }
  });

module.exports = db;
