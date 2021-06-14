const express = require('express');
const parcel = require('./routes/parcel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', parcel);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
