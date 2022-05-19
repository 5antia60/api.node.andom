//#region Imports

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan')
const app = express();

const ocurrencesRoutes = require('./routes/ocurrences.routes');
const countOcurrencesRoutes = require('./routes/count-ocurrences.routes');

//#endregion

app.use('/ocurrences', ocurrencesRoutes);
app.use('/count-ocurrences', countOcurrencesRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlPareser: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000)

