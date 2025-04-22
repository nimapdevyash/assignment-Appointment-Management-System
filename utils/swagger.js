const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Appointment Management",
    description: "Appointment Management APIs",
  },
  host: process.env.BASE_URL_SWAGGER,
  basePath: "/api",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./swagger/*.js"],
};

// Generate Swagger Spec
exports.swaggerSpec = swaggerJSDoc(options);
