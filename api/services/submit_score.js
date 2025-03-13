const { database, collection } = require('../config/config');
const { getCurrentDatetime, sanitizeInput } = require('../utils');
const { insertOneDoc } = require('../database');

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