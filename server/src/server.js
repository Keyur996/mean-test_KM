(function () {
  'use strict';

  const setErrorEvents = require('./utils/errorEvents');
  const config = require('./config');
  const app = require('./app');
  const setRoutes = require('./resources');
  const setConnection = require('./connection/connect');

  const start = async () => {
    try {
      await setConnection();
      setRoutes(app);
      const server = app.listen(config.port, () =>
        console.log(`Server is Running On Port ${config.port}`)
      );

      setErrorEvents(server);
    } catch (err) {
      throw new Error(err);
    }
  };

  module.exports = start;
})();
