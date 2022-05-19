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
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(process.env.PORT || 3000)

