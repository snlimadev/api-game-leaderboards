const { getRanking } = require('../services/get_ranking');

async function getRankingController(req, res) {
  const { platform, game, top } = req.query;

  if (
    !(platform && platform.toString().trim()) ||
    !(game && game.toString().trim())
  ) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const ranking = await getRanking(platform, game, top);

  if (ranking) {
    return res.status(200).json({ ranking: ranking });
  } else {
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { getRankingController };