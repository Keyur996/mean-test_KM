(function () {
  'use strict';

  const mongoose = require('mongoose');
  const validator = require('validator');

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please provide name'],
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: [true, 'Email address already exists'],
        lowercase: true,
        validate: [validator.default.isEmail, 'Please enter valid Email'],
      },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8,
      },
      photo: {
        type: String,
        required: [true, 'Please Upload File !!'],
      },
      preference: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Perference',
          required: [true, 'Please provide perference !!'],
        },
      ],
    },
    { timestamps: true }
  );

  userSchema.pre(/^find/, function (next) {
    this.populate({
      path: 'preference',
      select: '-__v',
    });
    next();
  });

  module.exports = mongoose.model('User', userSchema);
})();
