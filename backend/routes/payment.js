const { Router } = require('express');
const paymentController = require('../controllers/paymentController');
const router = Router();
router.post('/create-checkout-session', paymentController.paymentProcess);
module.exports = router;
