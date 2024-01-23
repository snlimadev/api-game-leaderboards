const { rateLimit } = require('express-rate-limit');

function setRateLimit(minutes, limit) {
  const rateLimiter = rateLimit({
    windowMs: minutes * 60 * 1000,
    limit: limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Rate limit reached for requests.' }
  });

  return rateLimiter;
}

module.exports = { setRateLimit };