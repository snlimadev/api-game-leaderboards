require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const { swaggerCss } = require('./config/config');

const routes = require('./routes');

const app = express();

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCssUrl: swaggerCss
}));

Object.values(routes).forEach((route) => {
  app.use(route.path, route.router);

  app.all(route.path, (req, res, next) => {
    res.status(405).json({ error: 'Method not allowed.' });
  });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error.' });
});

/*
app.listen(8080, () => {
  console.log('Node server is running.');
});
*/

module.exports = app;