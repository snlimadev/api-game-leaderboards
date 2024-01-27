const { database, collection } = require('../config/config');
const { insertOneDoc } = require('../database/insert_one_doc');
const { getCurrentDatetime } = require('../utils/get_current_datetime');
const { sanitizeInput } = require('../utils/sanitize_input');
const { setRateLimit } = require('../utils/set_rate_limit');

const ratelimiter = setRateLimit(15, 150);

async function submitScore(player, score, platform, game) {
  if (
    (player && player.toString().trim()) &&
    (score && parseInt(score) > 0) &&
    (platform && platform.toString().trim()) &&
    (game && game.toString().trim())
  ) {

    const doc = {
      datetime: getCurrentDatetime(),
      player: sanitizeInput(player),
      score: parseInt(score),
      platform: sanitizeInput(platform),
      game: sanitizeInput(game)
    }

    const inserted = await insertOneDoc(doc, database, collection);

    if (inserted) {
      return { status: 200, json: { message: 'Request successfully submitted.' } };
    } else {
      return { status: 500, json: { error: 'Internal server error.' } };
    }
  } else {
    return { status: 400, json: { error: 'Invalid request.' } };
  }
};

module.exports = { ratelimiter, submitScore };