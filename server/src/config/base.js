(function () {
  'use strict';

  function getBaseConfig(env) {
    return {
      env: env,
      isDev: env === 'development',
      isTest: env === 'test',
      port: 3000,
    };
  }

  module.exports = getBaseConfig;
})();
