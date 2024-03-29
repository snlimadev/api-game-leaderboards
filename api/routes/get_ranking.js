/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * /get_ranking:
 *   get:
 *     summary: Retrieve the top scores for a game
 *     description: >
 *       This endpoint is used to retrieve the top scores for the specified game.
 *       The JSON response is an array of objects containing the properties
 *       'position', 'player' and 'score'.
 *     tags:
 *       - Ranking
 *     parameters:
 *       - in: query
 *         name: platform
 *         description: >
 *           The platform where the score was recorded.
 *           Specify 'all' to consider all platforms.
 *         required: true
 *         schema:
 *           type: string
 *         example: android
 * 
 *       - in: query
 *         name: game
 *         description: The game where the score was recorded
 *         required: true
 *         schema:
 *           type: string
 *         example: spaceman
 * 
 *       - in: query
 *         name: top
 *         description: The number of positions to be returned (optional)
 *         required: false
 *         schema:
 *           type: integer
 *         example: 100
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       429:
 *         description: Too Many Requests
 *       500:
 *         description: Internal Server Error
 */

const express = require('express');
const router = express.Router();

const { validateToken } = require('../utils/validate_token');
const { ratelimiter, getRanking } = require('../services/get_ranking');

router.use(ratelimiter);

router.get('/', validateToken, async (req, res) => {
  const { platform, game, top } = req.query;
  const ranking = await getRanking(platform, game, top);

  res.status(ranking.status).json(ranking.json);
});

module.exports = router;