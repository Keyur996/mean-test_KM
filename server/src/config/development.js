(function () {
  'use strict';
  const path = require('path');
  module.exports = {
    dbUrl: 'mongodb://localhost:27017/usersdb',
    fileStore: path.join(__dirname, '../uploads/'),
  };
})();
