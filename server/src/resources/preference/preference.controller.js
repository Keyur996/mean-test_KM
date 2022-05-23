(function () {
  'use strict';
  const Curdcontroller = require('../../utils/crud.controller');
  const Perference = require('./preference.model');

  module.exports = new Curdcontroller(Perference);
})();
