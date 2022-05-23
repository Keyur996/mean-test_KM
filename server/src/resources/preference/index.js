(function () {
  'use strict';
  const express = require('express');

  const preferenceController = require('./preference.controller');
  const router = express.Router();

  router
    .route('')
    .get(preferenceController.getAll)
    .post(preferenceController.create);
  router
    .route('/:id')
    .get(preferenceController.getById)
    .put(preferenceController.updateOne)
    .delete(preferenceController.deleteOne);

  module.exports = router;
})();
