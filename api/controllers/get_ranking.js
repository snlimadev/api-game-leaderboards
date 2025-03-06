const { getRanking } = require('../services/get_ranking');

async function getRankingController(req, res) {
  const { platform, game, top } = req.query;
  let status, json;

  if (
    !(platform && platform.toString().trim()) ||
    !(game && game.toString().trim())
  ) {
    status = 400;
    json = { error: 'Invalid request.' };
  } else {
    const ranking = await getRanking(platform, game, top);

    if (ranking) {
      status = 200;
      json = { ranking: ranking };
    } else {
      status = 500;
      json = { error: 'Internal server error.' };
    }
  }

  res.status(status).json(json);
}

module.exports = { getRankingController };