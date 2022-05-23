(function () {
  'use strict';

  const util = require('util');
  const multer = require('multer');
  const fs = require('fs');
  const config = require('../config');

  const maxSize = 2 * 1024 * 1024;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, createDirIfNot(config.fileStore));
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const createDirIfNot = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    return path;
  };

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: multerFilter,
  });

  module.exports = util.promisify(upload.single('photo'));
})();
