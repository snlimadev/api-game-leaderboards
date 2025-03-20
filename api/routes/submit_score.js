/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * /submit_score:
 *   post:
 *     summary: Submit player's game score
 *     description: >
 *       This endpoint is used to submit a player's game score.
 *       The successful JSON response contains the property 'message' (string).
 *       In case of failure, it returns the property 'error' (string).
 *     tags:
 *       - Ranking
 *     parameters:
 *       - in: body
 *         name: scoreData
 *         description: Score data to submit
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             player:
 *               type: string
 *               description: The name of the player
 *               example: john_doe
 *             score:
 *               type: integer
 *               description: >
 *                 The score recorded by the player.
 *                 It must be a positive integer.
 *               example: 100
 *             platform:
 *               type: string
 *               description: The platform where the score was recorded
 *               example: android
 *             game:
 *               type: string
 *               description: The game where the score was recorded
 *               example: spaceman
 *     security:
 *       - BearerAuth: []
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

const { setRateLimit, validateToken } = require('../utils');
const { submitScoreController } = require('../controllers');

const path = '/submit_score';
const router = express.Router();

router.use(setRateLimit());

router.post('/', validateToken, submitScoreController);

module.exports = { path, router };