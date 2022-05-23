(function () {
  'use strict';

  const uploadFile = require('../../middlewares/upload');
  const config = require('../../config');

  const upload = async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: 'Please upload a file!' });
      }
      res.status(200).json({
        success: true,
        data: {
          fileName: req.file.filename,
          originalName: req.file.originalname,
          timeStamp: Date.now(),
        },
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };

  const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = config.fileStore;
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  };

  module.exports = {
    upload,
    download,
  };
})();
