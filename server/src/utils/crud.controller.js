(function () {
  'use strict';
  const APIFeatures = require('./apiFeature');
  class Curdcontroller {
    constructor(model) {
      this.model = model;
    }

    create = async (req, res, next) => {
      try {
        const doc = await this.model.create(req.body);
        res.status(200).json(doc);
      } catch (err) {
        next(err);
      }
    };

    getById = async (req, res, next) => {
      try {
        if (!req.params.id) {
          res
            .status(400)
            .json({ success: false, message: 'Please provide id' });
        }

        const doc = await this.model.findById(req.params.id).lean().exec();

        if (!doc) {
          res.json(400).json({ success: false, message: 'No User Found !!' });
        }

        res.status(200).json(doc);
      } catch (err) {
        next(err);
      }
    };

    updateOne = async (req, res, next) => {
      try {
        if (!req.params.id) {
          res
            .status(400)
            .json({ success: false, message: 'Please provide id' });
        }

        const doc = await this.model
          .findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          })
          .lean()
          .exec();

        if (!doc) {
          res.json(400).json({ success: false, message: 'No User Found !!' });
        }

        res.status(200).json(doc);
      } catch (err) {
        next(err);
      }
    };

    deleteOne = async (req, res, next) => {
      try {
        if (!req.params.id) {
          res
            .status(400)
            .json({ success: false, message: 'Please provide id' });
        }
        await this.model.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).json({ success: true, message: 'Record deleted !!' });
      } catch (err) {
        next(err);
      }
    };

    getAll = async (req, res, next) => {
      try {
        const features = new APIFeatures(this.model.find(), req.query)
          .filter()
          .sort()
          .limitFields()
          .paginate();

        const [docs, count] = await Promise.all([
          features.query,
          this.model.count(),
        ]);
        res.status(200).json({ success: true, data: docs, count: count });
      } catch (err) {
        next(err);
      }
    };
  }

  module.exports = Curdcontroller;
})();
