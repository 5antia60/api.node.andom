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


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const url = `mongodb+srv://${ DB_USER }:${ DB_PASSWORD }@apicluster.y3xzl.mongodb.net/andonDb?retryWrites=true&w=majority`;

mongoose.connect(url)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.listen(process.env.PORT || 3000)
