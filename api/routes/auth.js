/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user and generate access token
 *     description: >
 *       This endpoint is used to authenticate a user by validating the provided
 *       username and password against credentials stored in environment variables.
 *       The successful JSON response contains the property 'access_token' (string),
 *       which consists of a token that expires in 15 minutes.
 *       In case of failure, it returns the property 'error' (string).
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
 *       405:
 *         description: Method Not Allowed
 *       429:
 *         description: Too Many Requests
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');

const { setRateLimit } = require('../utils');
const { authController } = require('../controllers');

const path = '/auth';
const router = express.Router();

router.use(setRateLimit(15, 10));

router.post('/', authController);

module.exports = { path, router };