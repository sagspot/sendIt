const express = require('express');
const parcel = require('./routes/parcel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', parcel);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
