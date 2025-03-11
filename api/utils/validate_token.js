const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader) && authHeader.toString().split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    next();
  });
};

module.exports = { validateToken };