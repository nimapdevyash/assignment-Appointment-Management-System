const express = require("express");
const app = express();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const indexRouter = require("./src/routes/index");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./utils/swagger");
const cors = require("cors");

// Middleware for CORS, logging, parsing
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api", indexRouter);

// Health Check Route
app.use("/", (req, res) => res.send("App is working fine"));

// Catch 404 Errors
app.use((req, res, next) => {
  next(createError(404));
});

// Global Error Handler
app.use((err, req, res, next) => {

  const statusCode = err.status || 500;
  const response = {
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
  };

  console.error(err);

  res.status(statusCode).json(response);
});

module.exports = app;
