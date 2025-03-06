const { database, collection } = require('../config/config');
const { insertOneDoc } = require('../database/insert_one_doc');
const { getCurrentDatetime } = require('../utils/get_current_datetime');
const { sanitizeInput } = require('../utils/sanitize_input');

async function submitScore(player, score, platform, game) {
  const doc = {
    datetime: getCurrentDatetime(),
    player: sanitizeInput(player),
    score: parseInt(score),
    platform: sanitizeInput(platform),
    game: sanitizeInput(game)
  };

  const inserted = await insertOneDoc(doc, database, collection);

  if (inserted) {
    return true;
  } else {
    return false;
  }
}

module.exports = { submitScore };