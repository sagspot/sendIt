const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const parcel = require('./routes/parcel');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'sendIt Parcel API',
      description: 'An API to manage parcel delivery',
      contact: {
        name: 'Sagpot',
        url: 'https://sagspot.netlify.app',
        email: 'ollysag@gmail.com',
      },
      servers: [
        { description: 'sendIt Local API', url: 'http://localhost:5000' },
        {
          description: 'sendIt Heroku API',
          url: 'https://sagspot-sendit.herokuapp.com/api',
        },
      ],
    },
  },

  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const app = express();

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', parcel);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
