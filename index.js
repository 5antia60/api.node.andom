//#region Imports

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const ocurrencesRoutes = require('./routes/ocurrences.routes');

//#endregion

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/ocurrences', ocurrencesRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const url = `mongodb+srv://${ DB_USER }:${ DB_PASSWORD }@apicluster.y3xzl.mongodb.net/andonDb?retryWrites=true&w=majority`;

mongoose.connect(url)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err))
