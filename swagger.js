const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    swagger: '2.0',
    info: {
      title: 'Game Leaderboards',
      version: '1.0.5',
      description: 'A Node.js API for submitting scores and retrieving ' +
        'rankings for games, whose data are stored in a MongoDB database.',
    },
  },
  apis: ['./api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;