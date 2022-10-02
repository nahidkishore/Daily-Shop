const express = require('express');
const paymentController = require('../controllers/paymentController');
const Authorization = require('../services/Authorization');
const router = express.Router();

router.post('/create-checkout-session', paymentController.paymentProcess);

router.post( '/webhook',Authorization.authorized, express.raw({ type: 'application/json' }),paymentController.checkOutSession );
router.get('/verify-payment/:id',Authorization.authorized, paymentController.paymentVerify);
module.exports = router;
