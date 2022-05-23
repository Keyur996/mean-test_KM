(function () {
  'use strict';

  const mongoose = require('mongoose');

  const preferenceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      unique: true,
    },
  });

  module.exports = mongoose.model('Perference', preferenceSchema);
})();
