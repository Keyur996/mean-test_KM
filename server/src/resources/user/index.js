(function () {
  'use strict';
  const express = require('express');

  const {
    userController,
    imageUplodeMiddleware,
    search,
  } = require('./user.controller');
  const router = express.Router();

  router
    .route('')
    .get(userController.getAll)
    .post(imageUplodeMiddleware, userController.create);
  router
    .route('/:id')
    .get(userController.getById)
    .put(imageUplodeMiddleware, userController.updateOne)
    .delete(userController.deleteOne);
  router.route('/search').post(search);

  module.exports = router;
})();
