const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { secret, username, password } = require('../config/config');
const { setRateLimit } = require('../utils/set_rate_limit');

const ratelimiter = setRateLimit(15, 3);

function authenticateUser(p_username, p_password) {
  if (
    !(p_username && p_username.toString().trim()) ||
    !(p_password && p_password.toString().trim())
  ) {
    return { status: 400, json: { error: 'Invalid request.' } };
  }

  if (p_username === username && p_password === password) {
    const randomId = crypto.randomBytes(4).readUInt32LE(0);
    const randomUsername = crypto.randomBytes(16).toString('hex');
    const user = { id: randomId, username: randomUsername };
    const token = jwt.sign(user, secret, { expiresIn: '15m' });

    return { status: 200, json: { access_token: token } };
  } else {
    return { status: 401, json: { error: 'Invalid credentials.' } };
  }
};

module.exports = { ratelimiter, authenticateUser };