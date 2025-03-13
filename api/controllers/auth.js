const { authenticateUser } = require('../services');

async function authController(req, res) {
  const { username, password } = req.body;

  if (
    !(username && username.toString().trim()) ||
    !(password && password.toString().trim())
  ) {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const token = await authenticateUser(username, password);

  if (token) {
    return res.status(200).json({ access_token: token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
}

module.exports = { authController };