import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

import userRoute from './routes/users.js';
import parcelRoute from './routes/parcels.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SendIt parcel solution API',
      version: '1.0.0',
      deccription: 'A simple express library API',
    },
    servers: [
      {
        description: 'Prod server',
        url: 'https://sagspot-sendit.herokuapp.com',
      },
      {
        description: 'Dev server',
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api', userRoute);
app.use('/api/parcel', parcelRoute);
app.get('/', (req, res) => res.redirect('/api-docs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
