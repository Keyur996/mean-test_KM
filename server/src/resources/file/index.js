(function () {
  const express = require('express');
  const fileController = require('./file.controller');

  const router = express.Router();

  router.post('/upload', fileController.upload);
  router.get('/:name', fileController.download);

  module.exports = router;
})();
