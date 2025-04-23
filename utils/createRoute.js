
const { errorWrapper } = require("./errorWrapper");

const createRoute = (router , method, path, handler, middleware = null) => {
  const middlewares = Array.isArray(middleware)
    ? middleware
    : middleware
    ? [middleware]
    : [];

  router[method](path, ...middlewares, errorWrapper(handler));
};

module.exports = createRoute;
