const express = require('express');
const HomeProducts = require('../controllers/HomeProducts');
const Product = require('../controllers/Product');
const Authorization = require('../services/Authorization');
const productValidations = require('../validations/productValidations');
const router = express.Router();
router.post('/create-product', Authorization.authorized, Product.create);
router.get('/products/:page', Authorization.authorized, Product.get);
router.get('/product/:id', Product.getProduct);
router.put(
  '/product',
  [Authorization.authorized, productValidations],
  Product.updateProduct
);
router.delete('/delete/:id', Authorization.authorized, Product.deleteProduct);
router.get("/cat-products/:name/:page", HomeProducts.catProducts);
module.exports = router;
