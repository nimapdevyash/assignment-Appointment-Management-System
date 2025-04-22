const router = require("express").Router();
const { errorWrapper } = require("../../utils/errorWrapper");
const checkAuth = require("../middleWare/checkAuth");
const { checkPermission } = require("../middleWare/checkPermission");

const {
  insertEntity,
  retrieveEntity,
  retrieveEntityById,
  modifyEntity,
  removeEntity,
} = require("../controllers/entity");

// Route for inserting a new entity
router.post("/", checkAuth, checkPermission, errorWrapper(insertEntity));

// Route for retrieving all entities
router.get("/", checkAuth, checkPermission, errorWrapper(retrieveEntity));

// Route for retrieving a single entity by its ID
router.get(
  "/:id",
  checkAuth,
  checkPermission,
  errorWrapper(retrieveEntityById)
);

// Route for modifying an entity by its ID
router.put("/:id", checkAuth, checkPermission, errorWrapper(modifyEntity));

// Route for removing an entity by its ID
router.delete("/:id", checkAuth, checkPermission, errorWrapper(removeEntity));

module.exports = router;
