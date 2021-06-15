const express = require('express');
const dotenv = require('dotenv').config();

// const parcel = require('./routes/parcel');
const userRoute = require('./routes/users');
const parcelRoute = require('./routes/parcels');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRoute);
app.use('/api/parcel', parcelRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
