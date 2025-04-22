/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Permission API
 *   description: API for managing permissions, including creating, fetching, updating, and deleting permissions.
 *   version: 1.0.0
 * paths:
 *   /permissions:
 *     get:
 *       tags:
 *         - Permission
 *       summary: Fetch all permissions
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved permission data
 *           schema:
 *             type: object
 *             properties:
 *               allPermissionData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     entity:
 *                       type: string
 *                       description: The entity associated with the permission
 *                       example: user
 *                     actionName:
 *                       type: string
 *                       description: The action name of the permission
 *                       example: create
 *                     description:
 *                       type: string
 *                       description: Description of the permission
 *                       example: Allows creation of new users
 *                     baseUrl:
 *                       type: string
 *                       description: Base URL of the API endpoint
 *                       example: /api/users
 *                     path:
 *                       type: string
 *                       description: Path of the API endpoint
 *                       example: /create
 *                     method:
 *                       type: string
 *                       description: HTTP method (GET, POST, PUT, DELETE)
 *                       example: POST
 *         404:
 *           description: No permissions found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Permission found
 *     post:
 *       tags:
 *         - Permission
 *       summary: Create a new permission
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: permission
 *           description: Permission to be created
 *           schema:
 *             type: object
 *             required:
 *               - entity
 *               - actionName
 *               - description
 *               - baseUrl
 *               - path
 *               - method
 *             properties:
 *               entity:
 *                 type: string
 *                 description: The entity associated with the permission
 *                 example: user
 *               actionName:
 *                 type: string
 *                 description: The action name of the permission
 *                 example: create
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: Allows creation of new users
 *               baseUrl:
 *                 type: string
 *                 description: Base URL of the API endpoint
 *                 example: /api/users
 *               path:
 *                 type: string
 *                 description: Path of the API endpoint
 *                 example: /create
 *               method:
 *                 type: string
 *                 description: HTTP method (GET, POST, PUT, DELETE)
 *                 example: POST
 *       responses:
 *         201:
 *           description: Permission successfully created
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Permission created
 *               permission:
 *                 type: object
 *                 properties:
 *                   entity:
 *                     type: string
 *                     example: user
 *                   actionName:
 *                     type: string
 *                     example: create
 *                   description:
 *                     type: string
 *                     example: Allows creation of new users
 *                   baseUrl:
 *                     type: string
 *                     example: /api/users
 *                   path:
 *                     type: string
 *                     example: /create
 *                   method:
 *                     type: string
 *                     example: POST
 *         422:
 *           description: Failed to create permission
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Failed to add permission
 *   /permissions/{id}:
 *     get:
 *       tags:
 *         - Permission
 *       summary: Fetch a permission by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the permission to fetch
 *           required: true
 *           type: string
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved permission data
 *           schema:
 *             type: object
 *             properties:
 *               entity:
 *                 type: string
 *                 description: The entity associated with the permission
 *                 example: user
 *               actionName:
 *                 type: string
 *                 description: The action name of the permission
 *                 example: create
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: Allows creation of new users
 *               baseUrl:
 *                 type: string
 *                 description: Base URL of the API endpoint
 *                 example: /api/users
 *               path:
 *                 type: string
 *                 description: Path of the API endpoint
 *                 example: /create
 *               method:
 *                 type: string
 *                 description: HTTP method (GET, POST, PUT, DELETE)
 *                 example: POST
 *         404:
 *           description: Permission not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Permission found with Id {id}
 *     put:
 *       tags:
 *         - Permission
 *       summary: Update a permission by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the permission to update
 *           required: true
 *           type: string
 *         - in: body
 *           name: permission
 *           description: Permission details to be updated
 *           schema:
 *             type: object
 *             properties:
 *               entity:
 *                 type: string
 *                 description: The entity associated with the permission
 *                 example: user
 *               actionName:
 *                 type: string
 *                 description: The action name of the permission
 *                 example: create
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: Allows creation of new users
 *               baseUrl:
 *                 type: string
 *                 description: Base URL of the API endpoint
 *                 example: /api/users
 *               path:
 *                 type: string
 *                 description: Path of the API endpoint
 *                 example: /create
 *               method:
 *                 type: string
 *                 description: HTTP method (GET, POST, PUT, DELETE)
 *                 example: POST
 *       responses:
 *         200:
 *           description: Permission successfully updated
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Permission updated
 *               permission:
 *                 type: object
 *                 properties:
 *                   entity:
 *                     type: string
 *                     example: user
 *                   actionName:
 *                     type: string
 *                     example: create
 *                   description:
 *                     type: string
 *                     example: Allows creation of new users
 *                   baseUrl:
 *                     type: string
 *                     example: /api/users
 *                   path:
 *                     type: string
 *                     example: /create
 *                   method:
 *                     type: string
 *                     example: POST
 *         404:
 *           description: Permission not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Permission found with Id {id}
 *         400:
 *           description: Bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Bad request
 *     delete:
 *       tags:
 *         - Permission
 *       summary: Delete a permission by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the permission to delete
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Permission successfully deleted
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Permission deleted
 *         404:
 *           description: Permission not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Permission found with Id {id}
 */
