const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { secret, username, password } = require('../config/config');
const { setRateLimit } = require('../utils/set_rate_limit');
const { getCurrentDatetime } = require('../utils/get_current_datetime');

const ratelimiter = setRateLimit(15, 10);

async function authenticateUser(p_username, p_password) {
  if (
    !(p_username && p_username.toString().trim()) ||
    !(p_password && p_password.toString().trim())
  ) {
    return { status: 400, json: { error: 'Invalid request.' } };
  }

  const usernameMatch = p_username === username;
  const passwordMatch = await bcrypt.compare(p_password, password);

  if (usernameMatch && passwordMatch) {
    const randomId = crypto.randomBytes(16).toString('hex');
    // The payload here is just to avoid always generating identical tokens
    const payload = { tokenId: randomId, timestamp: getCurrentDatetime() };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });

    return { status: 200, json: { access_token: token } };
  } else {
    return { status: 401, json: { error: 'Invalid credentials.' } };
  }
};

module.exports = { ratelimiter, authenticateUser };