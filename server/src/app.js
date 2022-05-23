(function () {
  'use strict';

  const express = require('express');
  require('express-async-errors');
  const cors = require('cors');
  const morgan = require('morgan');
  const helmet = require('helmet');
  const xss = require('xss-clean');
  const hpp = require('hpp');
  const compression = require('compression');

  const config = require('./config');

  const app = express();

  app.enable('trust proxy');
  // app.use(cors());
  // app.options('*', cors());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
  });

  // Set security HTTP headers
  // app.use(
  //   helmet({
  //     crossOriginResourcePolicy: { policy: 'same-site' },
  //   })
  // );

  // Enable morgan for development
  if (config.isDev) {
    app.use(morgan('dev'));
  }

  app.use(express.json({}));
  app.use(express.urlencoded({ extended: true }));

  // Data sanitization against XSS
  // app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());

  // app.use(compression());

  module.exports = app;
})();
