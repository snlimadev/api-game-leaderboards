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
 *               description: The score recorded by the player
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
 *       429:
 *         description: Too Many Requests
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');
const router = express.Router();

const { setRateLimit } = require('../utils/set_rate_limit');
const { validateToken } = require('../utils/validate_token');
const { submitScoreController } = require('../controllers/submit_score');

router.use(setRateLimit(15, 150));

router.post('/', validateToken, submitScoreController);

module.exports = router;