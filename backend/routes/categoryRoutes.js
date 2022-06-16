const express = require('express');
const router = express.Router();
const categoryValidation = require('../validations/categoryValidations');
const Category = require('../controllers/Category');
const Authorization = require('../services/Authorization');
router.post(
  '/create-category',
  [categoryValidation, Authorization.authorized],
  Category.create
);
router.get('/categories/:page', Authorization.authorized, Category.categories);
module.exports = router;
