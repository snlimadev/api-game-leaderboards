const { authenticateUser } = require('../services/auth');

async function authController(req, res) {
  const { username, password } = req.body;
  let status, json;

  if (
    !(username && username.toString().trim()) ||
    !(password && password.toString().trim())
  ) {
    status = 400;
    json = { error: 'Invalid request.' };
  } else {
    const token = await authenticateUser(username, password);

    if (token) {
      status = 200;
      json = { access_token: token };
    } else {
      status = 401;
      json = { error: 'Invalid credentials.' };
    }
  }

  res.status(status).json(json);
}

module.exports = { authController };