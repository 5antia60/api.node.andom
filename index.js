//#region Imports

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const ocurrencesRoutes = require('./routes/ocurrences.routes');
const countOcurrencesRoutes = require('./routes/count-ocurrences.routes');

//#endregion

//#region Routes

app.use(cors());
app.use(bodyParser.json())
app.use('/ocurrences', ocurrencesRoutes);
app.use('/count-ocurrences', countOcurrencesRoutes);
app.get('/', (req, res) => res.send('API Online!'));

//#endregion

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-type, X-Requested-With, Origin, Accept');
  next();
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT || 3000)

