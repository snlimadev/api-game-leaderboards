const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { secret, username, password } = require('../config/config');
const { getCurrentDatetime } = require('../utils/get_current_datetime');

async function authenticateUser(p_username, p_password) {
  const usernameMatch = p_username.toString() === username;
  const passwordMatch = await bcrypt.compare(p_password.toString(), password);

  if (usernameMatch && passwordMatch) {
    const randomId = crypto.randomBytes(16).toString('hex');
    // The payload here is just to avoid always generating identical tokens
    const payload = { tokenId: randomId, timestamp: getCurrentDatetime() };
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });

    return token;
  } else {
    return null;
  }
}

module.exports = { authenticateUser };