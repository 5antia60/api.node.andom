const mongoose = require('mongoose');

const CountOcurrences = mongoose.model('CountOcurrences', {
  count: Number,
  type: Number,
});

module.exports = CountOcurrences;
