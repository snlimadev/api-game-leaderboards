const { authenticateUser } = require('./auth');
const { getRanking } = require('./get_ranking');
const { submitScore } = require('./submit_score');

module.exports = {
  authenticateUser,
  getRanking,
  submitScore
};