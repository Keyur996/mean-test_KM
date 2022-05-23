(function () {
  'use strict';

  const userRoutes = require('./user');
  const fileRoutes = require('./file');
  const preferenceRoutes = require('./preference');

  const setRoutes = (app) => {
    app.use('/api/file', fileRoutes);
    app.use('/api/preference', preferenceRoutes);
    app.use('/api/user', userRoutes);
  };

  module.exports = setRoutes;
})();
