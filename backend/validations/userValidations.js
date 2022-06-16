const {body}= require('express-validator');
module.exports.registerValidations = [
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .trim()
      .withMessage('Email is required'),
    body('password')
      .isLength({ min: 5 })

      .withMessage('Password must be at least 6 characters'),
  ];

  module.exports.loginValidations = [
  
    body('email')
      .isEmail()
      .normalizeEmail()
      .trim()
      .escape()
      .withMessage('Email is required'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password is required'),
  ];