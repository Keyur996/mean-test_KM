(function () {
  'use strict';
  const mongoose = require('mongoose');
  const config = require('../config');

  const setConnection = async () => {
    try {
      await mongoose.connect(config.dbUrl ?? '');
      console.log('DataBase Connnected Successfully !!');
    } catch (err) {
      throw new Error('Unable To connect With DB !!');
    }
  };

  module.exports = setConnection;
})();
