const { authController } = require('./auth');
const { getRankingController } = require('./get_ranking');
const { submitScoreController } = require('./submit_score');

module.exports = {
  authController,
  getRankingController,
  submitScoreController
};