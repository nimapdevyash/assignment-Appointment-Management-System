/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: User API
 *   description: API for managing users
 *   version: 1.0.0
 * host: api.example.com
 * basePath: /v1
 * schemes:
 *   - https
 * paths:
 *   /users:
 *     post:
 *       tags:
 *         - User
 *       summary: Create a new user
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: user
 *           description: User object to be created
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: password123
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               mobileNumber:
 *                 type: string
 *                 description: Mobile number of the user
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: admin
 *       responses:
 *         200:
 *           description: User successfully created
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User created
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   password:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   mobileNumber:
 *                     type: string
 *                   role:
 *                     type: string
 *         400:
 *           description: Bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Data not added
 *     get:
 *       tags:
 *         - User
 *       summary: Fetch all users
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully fetched all users
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User found
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     password:
 *                       type: string
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     mobileNumber:
 *                       type: string
 *                     role:
 *                       type: string
 *         404:
 *           description: No users found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Data not found
 *   /users/{id}:
 *     get:
 *       tags:
 *         - User
 *       summary: Fetch user by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to fetch
 *           required: true
 *           type: string
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully fetched user
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User found
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   password:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   mobileNumber:
 *                     type: string
 *                   role:
 *                     type: string
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No user found with Id {id}
 *     put:
 *       tags:
 *         - User
 *       summary: Update user by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to update
 *           required: true
 *           type: string
 *         - in: body
 *           name: user
 *           description: User object with updated details
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Doe
 *               userName:
 *                 type: string
 *                 description: Username of the user
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               mobileNumber:
 *                 type: string
 *                 description: Mobile number of the user
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: admin
 *       responses:
 *         200:
 *           description: Successfully updated user
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User updated
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   mobileNumber:
 *                     type: string
 *                   role:
 *                     type: string
 *         400:
 *           description: User not found or bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No user found with Id {id}
 *     delete:
 *       tags:
 *         - User
 *       summary: Delete user by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to delete
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Successfully deleted user
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User deleted
 *               user:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No user found with Id {id}
 *   /meetings/{meetingId}/invitations/{userId}:
 *     put:
 *       tags:
 *         - User
 *       summary: Handle meeting invitation
 *       parameters:
 *         - name: meetingId
 *           in: path
 *           description: ID of the meeting
 *           required: true
 *           type: string
 *         - name: userId
 *           in: path
 *           description: ID of the user
 *           required: true
 *           type: string
 *         - in: body
 *           name: invitation
 *           description: Invitation status
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status of the invitation
 *                 example: Accepted
 *       responses:
 *         200:
 *           description: Successfully updated invitation status
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invitation for meeting {title} has {status}
 *               meeting:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   attendeesStatus:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         attendee:
 *                           type: string
 *                         status:
 *                           type: string
 *         404:
 *           description: Meeting or user not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting or User not found
 *   /users/{id}/block:
 *     put:
 *       tags:
 *         - User
 *       summary: Block a user
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to block
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: User successfully blocked
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User blocked successfully
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No user found with Id {id}
 *   /users/{id}/unblock:
 *     put:
 *       tags:
 *         - User
 *       summary: Unblock a user
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the user to unblock
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: User successfully unblocked
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User unblocked successfully
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No user found with Id {id}
 * security:
 *   - bearerAuth: []
 * definitions:
 *   bearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */
