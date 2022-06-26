const express = require('express');
const Product = require('../controllers/Product');
const Authorization = require('../services/Authorization');
const router = express.Router();
router.post('/create-product', Authorization.authorized, Product.create);

module.exports = router;
