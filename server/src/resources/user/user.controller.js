(function () {
  'use strict';
  const Curdcontroller = require('../../utils/crud.controller');
  const uploadFile = require('./../../middlewares/upload');
  const User = require('./user.model');

  const imageUplodeMiddleware = async (req, res, next) => {
    try {
      await uploadFile(req, res);
      req.body.preference = JSON.parse(req.body.preference);
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.photo = url + '/api/file/' + req.file.filename;
      }
      next();
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };

  const search = async (req, res, next) => {
    try {
      const queryString = {};
      queryString.word = new RegExp(req.body.word, 'i');

      const query = User.find(queryString);
      const count = await query.count();

      const page = req.body.page || 1;
      const limit = req.body.limit || 100;
      const skip = (page - 1) * (req.body.limit || 100);

      const docs = await User.find(queryString).skip(skip).limit(limit);

      res.status(200).json({ success: true, data: docs, count: count });
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: 'Something Went Wrong !!' + err });
    }
  };

  module.exports = {
    userController: new Curdcontroller(User),
    imageUplodeMiddleware: imageUplodeMiddleware,
    search: search,
  };
})();
