/**
 * @swagger
 * swagger: '2.0'
 * info:
 *   title: Meeting API
 *   description: API for managing meetings, including creating, retrieving, updating, and deleting meetings, as well as generating reports.
 *   version: 1.0.0
 * paths:
 *   /meetings:
 *     get:
 *       tags:
 *         - Meeting
 *       summary: Fetch all meetings
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved meeting data
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: All meetings fetched successfully
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the meeting
 *                       example: Team Sync
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the meeting
 *                       example: 08/30/2024
 *                     time:
 *                       type: string
 *                       description: Time of the meeting
 *                       example: 14:30:00
 *                     attendees:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of attendee IDs
 *                     attendeesStatus:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of statuses corresponding to each attendee
 *         404:
 *           description: No meetings found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No meetings found
 *     post:
 *       tags:
 *         - Meeting
 *       summary: Create a new meeting
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: meeting
 *           description: Meeting details to be created
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - time
 *               - attendees
 *               - attendeesStatus
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the meeting
 *                 example: Team Sync
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the meeting in MM/DD/YYYY format
 *                 example: 08/30/2024
 *               time:
 *                 type: string
 *                 description: Time of the meeting in HH:MM:SS format
 *                 example: 14:30:00
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of attendee IDs
 *               attendeesStatus:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of statuses corresponding to each attendee
 *       responses:
 *         201:
 *           description: Meeting successfully created
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: New meeting created successfully
 *               meeting:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Team Sync
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 08/30/2024
 *                   time:
 *                     type: string
 *                     example: 14:30:00
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *                   attendeesStatus:
 *                     type: array
 *                     items:
 *                       type: string
 *         400:
 *           description: Bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Attendees and attendeesStatus must be arrays
 *   /meetings/{id}:
 *     get:
 *       tags:
 *         - Meeting
 *       summary: Fetch a meeting by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the meeting to fetch
 *           required: true
 *           type: string
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully retrieved meeting data
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting fetched successfully
 *               meeting:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Team Sync
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 08/30/2024
 *                   time:
 *                     type: string
 *                     example: 14:30:00
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *                   attendeesStatus:
 *                     type: array
 *                     items:
 *                       type: string
 *         404:
 *           description: Meeting not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting not found with Id {id}
 *     put:
 *       tags:
 *         - Meeting
 *       summary: Update a meeting by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the meeting to update
 *           required: true
 *           type: string
 *         - in: body
 *           name: meeting
 *           description: Meeting details to be updated
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the meeting
 *                 example: Team Sync
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the meeting in MM/DD/YYYY format
 *                 example: 08/30/2024
 *               time:
 *                 type: string
 *                 description: Time of the meeting in HH:MM:SS format
 *                 example: 14:30:00
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of attendee IDs
 *               attendeesStatus:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of statuses corresponding to each attendee
 *       responses:
 *         200:
 *           description: Meeting successfully updated
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting updated successfully
 *               meeting:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Team Sync
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: 08/30/2024
 *                   time:
 *                     type: string
 *                     example: 14:30:00
 *                   attendees:
 *                     type: array
 *                     items:
 *                       type: string
 *                   attendeesStatus:
 *                     type: array
 *                     items:
 *                       type: string
 *         404:
 *           description: Meeting not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting not found with Id {id}
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
 *         - Meeting
 *       summary: Delete a meeting by ID
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the meeting to delete
 *           required: true
 *           type: string
 *       responses:
 *         200:
 *           description: Meeting successfully deleted
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting deleted successfully
 *         404:
 *           description: Meeting not found
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Meeting not found with Id {id}
 *   /meetings/user/{userId}:
 *     get:
 *       tags:
 *         - Meeting
 *       summary: Fetch meetings by user ID
 *       parameters:
 *         - name: userId
 *           in: path
 *           description: ID of the user whose meetings are to be fetched
 *           required: true
 *           type: string
 *       security:
 *         - bearerAuth: []
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: Successfully fetched user meetings
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Your meetings are fetched successfully
 *               meetings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Title of the meeting
 *                       example: Team Sync
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: Date of the meeting
 *                       example: 08/30/2024
 *                     time:
 *                       type: string
 *                       description: Time of the meeting
 *                       example: 14:30:00
 *                     attendees:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of attendee IDs
 *                     attendeesStatus:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of statuses corresponding to each attendee
 *         404:
 *           description: No meetings found for the user
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No meetings found for user with Id {userId}
 *   /meetings/monthly-report:
 *     post:
 *       tags:
 *         - Meeting
 *       summary: Generate a report for meetings in a specific month
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: report
 *           description: Month for which to generate the report
 *           schema:
 *             type: object
 *             required:
 *               - month
 *             properties:
 *               month:
 *                 type: integer
 *                 description: Month for the report (1-12)
 *                 example: 8
 *       responses:
 *         200:
 *           description: Monthly report generated successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Monthly report generated successfully
 *               report:
 *                 type: object
 *                 properties:
 *                   scheduledMeetings:
 *                     type: integer
 *                     example: 30
 *                   attendedMeetings:
 *                     type: integer
 *                     example: 20
 *                   month:
 *                     type: integer
 *                     example: 8
 *         400:
 *           description: Bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid month provided
 *   /meetings/custom-report:
 *     post:
 *       tags:
 *         - Meeting
 *       summary: Generate a report for a custom date range
 *       security:
 *         - bearerAuth: []
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: report
 *           description: Custom date range for the report
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the range
 *                 example: 01/08/2024
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the range
 *                 example: 31/08/2024
 *       responses:
 *         200:
 *           description: Report generated successfully
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Report generated successfully
 *               report:
 *                 type: object
 *                 properties:
 *                   scheduledMeetings:
 *                     type: integer
 *                     example: 30
 *                   attendedMeetings:
 *                     type: integer
 *                     example: 20
 *         400:
 *           description: Bad request
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Invalid date range
 */
