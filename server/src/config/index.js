(function () {
  'use strict';

  const _ = require('lodash');
  const getBaseConfig = require('./base');

  const env = process.env.NODE_ENV || 'development';

  const getEnvConfig = () => {
    try {
      console.log('Environment => ' + env);
      return require(`./${env}`);
    } catch (err) {
      console.log(
        'Error Inside Config. File not Found. Please Check File Name'
      );
      console.log('Loading Default Development Config');
      return require('./development');
    }
  };

  module.exports = Object.freeze(_.merge(getBaseConfig(env), getEnvConfig()));
})();
