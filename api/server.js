require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const { swaggerCss } = require('./config/config');

const authRoute = require('./routes/auth');
const getRankingRoute = require('./routes/get_ranking');
const submitScoreRoute = require('./routes/submit_score');

const app = express();

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCssUrl: swaggerCss
}));

app.use('/auth', authRoute);
app.use('/get_ranking', getRankingRoute);
app.use('/submit_score', submitScoreRoute);

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