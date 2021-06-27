import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRoute from './routes/users.js';
import parcelRoute from './routes/parcels.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoute);
app.use('/api/parcel', parcelRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
