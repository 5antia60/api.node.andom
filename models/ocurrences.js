const mongoose = require('mongoose');

const Ocurrences = mongoose.model('Ocurrences', {
  userName: String,
  type: Number,
  date: Date,
  title: String,
  description: String,
  suggestions: String,
  sector: String,
  status: String,
});

module.exports = Ocurrences;
