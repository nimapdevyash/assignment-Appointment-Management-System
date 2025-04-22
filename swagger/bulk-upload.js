/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Bulk Upload API
 *   description: API for handling bulk uploads, including adding, fetching, and deleting upload details.
 *   version: 1.0.0
 * paths:
 *   /bulk-upload:
 *     post:
 *       tags:
 *         - Bulk Upload
 *       summary: Add bulk upload data
 *       description: Uploads a file and creates records in bulk from the file data.
 *       consumes:
 *         - multipart/form-data
 *       parameters:
 *         - name: file
 *           in: formData
 *           description: File to be uploaded for bulk data processing
 *           required: true
 *           type: file
 *         - name: userId
 *           in: query
 *           description: User ID of the person uploading the file
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Bulk upload completed successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Data bulk upload successfully
 *         400:
 *           description: Bad request, failed to process the upload
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid file or userId
 *     get:
 *       tags:
 *         - Bulk Upload
 *       summary: Fetch upload details
 *       description: Retrieves details of bulk uploads performed by the current user.
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully fetched upload details
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Upload details fetched successfully
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         email:
 *                           type: string
 *                           example: johndoe@example.com
 *                     fileId:
 *                       type: string
 *                       description: File identifier
 *                       example: 12345
 *                     filePath:
 *                       type: string
 *                       description: Path of the uploaded file
 *                       example: /uploads/2024/08/30/file.csv
 *                     extension:
 *                       type: string
 *                       description: File extension
 *                       example: csv
 *                     status:
 *                       type: string
 *                       description: Upload status
 *                       example: completed
 *         404:
 *           description: No data found for the user
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No data found
 *   /bulk-upload/{id}:
 *     delete:
 *       tags:
 *         - Bulk Upload
 *       summary: Delete upload details
 *       description: Deletes upload details for a specific upload entry by ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the upload details to delete
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Successfully deleted upload details
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Upload details deleted successfully
 *         404:
 *           description: Upload details not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Upload details not found
 */
