const { database, collection } = require('../config/config');
const { findMultipleDocs } = require('../database/find_multiple_docs');
const { sanitizeInput } = require('../utils/sanitize_input');
const { setRateLimit } = require('../utils/set_rate_limit');

const ratelimiter = setRateLimit(15, 150);

async function getRanking(platform, game, top) {
  if (
    (platform && platform.toString().trim()) &&
    (game && game.toString().trim())
  ) {
    const query = {
      platform: (platform !== 'all') ? sanitizeInput(platform) : { $exists: true },
      game: sanitizeInput(game)
    };

    const options = {
      sort: { score: -1 },
      projection: { _id: 0, player: 1, score: 1 },
      limit: (top && parseInt(top) > 0) ? parseInt(top) : null
    };

    let ranking = await findMultipleDocs(query, database, collection, options);

    if (ranking) {
      if (ranking.length > 0) {
        ranking = ranking.map((doc, index) => ({ position: index + 1, ...doc }));
      }

      return { status: 200, json: { ranking: ranking } };
    } else {
      return { status: 500, json: { error: 'Internal server error.' } };
    }
  } else {
    return { status: 400, json: { error: 'Invalid request.' } };
  }
};

module.exports = { ratelimiter, getRanking };