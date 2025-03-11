const { submitScore } = require('../services/submit_score');

async function submitScoreController(req, res) {
  const { player, score, platform, game } = req.body;

  if (
    !(player && player.toString().trim()) ||
    !(score && parseInt(score) > 0) ||
    !(platform && platform.toString().trim()) ||
    !(game && game.toString().trim())
  ) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const scoreSubmitted = await submitScore(player, score, platform, game);

  if (scoreSubmitted) {
    return res.status(200).json({ message: 'Request successfully submitted.' });
  } else {
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = { submitScoreController };