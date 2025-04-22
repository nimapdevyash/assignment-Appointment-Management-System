/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Authentication API
 *   description: API for user authentication including login, logout, password reset, and email sending.
 *   version: 1.0.0
 * paths:
 *   /auth/login:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: User login
 *       description: Authenticates a user and returns a token.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: credentials
 *           description: User email and password for login
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: password123
 *       responses:
 *         200:
 *           description: User logged in successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User logged in successfully
 *               userId:
 *                 type: string
 *                 description: User ID
 *               token:
 *                 type: string
 *                 description: Authentication token
 *         404:
 *           description: User not found or invalid credentials
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found with Email user@example.com
 *         400:
 *           description: Invalid password
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid Password!
 *   /auth/logout:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: User logout
 *       description: Logs out a user by removing their token.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: userId
 *           in: query
 *           description: ID of the user to log out
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: User logged out successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User logged out successfully
 *   /auth/reset-password-request:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Request password reset link
 *       description: Sends an email with a password reset link to the user.
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: request
 *           description: Email address for password reset
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *       responses:
 *         200:
 *           description: Password reset email sent
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Password reset email sent.
 *         404:
 *           description: User not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found with Email user@example.com
 *   /auth/reset-password/{token}:
 *     post:
 *       tags:
 *         - Authentication
 *       summary: Reset password
 *       description: Resets the user's password using a reset token.
 *       parameters:
 *         - name: token
 *           in: path
 *           description: Password reset token
 *           required: true
 *           type: string
 *         - in: body
 *           name: reset
 *           description: New password
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password for the user
 *                 example: newpassword123
 *       responses:
 *         200:
 *           description: Password reset successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Password reset successfully
 *         400:
 *           description: Invalid reset token
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid reset token
 *         404:
 *           description: User not found or token expired
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: User not found with ID {userId}
 */
