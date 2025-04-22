/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Role API
 *   description: API for managing roles
 *   version: 1.0.0
 * paths:
 *   /roles:
 *     get:
 *       tags:
 *         - Role
 *       summary: Fetch all roles
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved role data
 *           schema:
 *             type: object
 *             properties:
 *               allRoleData:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the role
 *                       example: admin
 *                     description:
 *                       type: string
 *                       description: Description of the role
 *                       example: Admin for invoice management
 *         404:
 *           description: No roles found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Role found
 *     post:
 *       tags:
 *         - Role
 *       summary: Create a new role
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: role
 *           description: Role to be created
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *                 example: admin
 *               description:
 *                 type: string
 *                 description: Description of the role
 *                 example: Admin for invoice management
 *       responses:
 *         201:
 *           description: Role successfully created
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Role created
 *               role:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: admin
 *                   description:
 *                     type: string
 *                     example: Admin for invoice management
 *         422:
 *           description: Failed to create role
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Failed to add role
 *   /role/{id}:
 *     get:
 *       tags:
 *         - Role
 *       summary: Fetch a role by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the role to fetch
 *           required: true
 *           type: string
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved role data
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *                 example: admin
 *               description:
 *                 type: string
 *                 description: Description of the role
 *                 example: Admin for invoice management
 *         404:
 *           description: Role not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Role found with Id {id}
 *     put:
 *       tags:
 *         - Role
 *       summary: Update a role by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the role to update
 *           required: true
 *           type: string
 *         - in: body
 *           name: role
 *           description: Role to be updated
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the role
 *                 example: admin
 *               description:
 *                 type: string
 *                 description: Description of the role
 *                 example: Admin for invoice management
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of permissions
 *       responses:
 *         200:
 *           description: Role successfully updated
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Role updated
 *               role:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: admin
 *                   description:
 *                     type: string
 *                     example: Admin for invoice management
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: string
 *         404:
 *           description: Role not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Role updated with Id {id}
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
 *         - Role
 *       summary: Delete a role by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the role to delete
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Role successfully deleted
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Role deleted
 *         404:
 *           description: Role not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No Role found with Id {id}
 */
