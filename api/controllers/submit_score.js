const { submitScore } = require('../services/submit_score');

async function submitScoreController(req, res) {
  const { player, score, platform, game } = req.body;
  let status, json;

  if (
    !(player && player.toString().trim()) ||
    !(score && parseInt(score) > 0) ||
    !(platform && platform.toString().trim()) ||
    !(game && game.toString().trim())
  ) {
    status = 400;
    json = { error: 'Invalid request.' };
  } else {
    const scoreSubmitted = await submitScore(player, score, platform, game);

    if (scoreSubmitted) {
      status = 200;
      json = { message: 'Request successfully submitted.' };
    } else {
      status = 500;
      json = { error: 'Internal server error.' };
    }
  }

  res.status(status).json(json);
}

module.exports = { submitScoreController };