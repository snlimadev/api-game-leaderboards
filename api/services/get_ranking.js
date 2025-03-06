const { database, collection } = require('../config/config');
const { findMultipleDocs } = require('../database/find_multiple_docs');
const { sanitizeInput } = require('../utils/sanitize_input');

async function getRanking(platform, game, top) {
  const query = {
    platform: (platform !== 'all') ? sanitizeInput(platform) : { $exists: true },
    game: sanitizeInput(game)
  };

  const options = {
    sort: { score: -1, _id: 1 },
    projection: { _id: 0, player: 1, score: 1 },
    limit: (top && parseInt(top) > 0) ? parseInt(top) : null
  };

  let ranking = await findMultipleDocs(query, database, collection, options);

  if (ranking) {
    if (ranking.length > 0) {
      ranking = ranking.map((doc, index) => ({ position: index + 1, ...doc }));
    }

    return ranking;
  } else {
    return null;
  }
}

module.exports = { getRanking };