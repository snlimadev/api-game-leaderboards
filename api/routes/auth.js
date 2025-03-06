/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user and generate access token
 *     description: >
 *       This endpoint is used to authenticate a user by validating the provided
 *       username and password against credentials stored in environment variables.
 *       The JSON response contains an access token that expires in 15 minutes.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for authentication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the user
 *               example: john_doe
 *             password:
 *               type: string
 *               description: The password of the user
 *               example: secure_password
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too Many Requests
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');
const router = express.Router();

const { setRateLimit } = require('../utils/set_rate_limit');
const { authController } = require('../controllers/auth');

router.use(setRateLimit(15, 10));

router.post('/', authController);

module.exports = router;