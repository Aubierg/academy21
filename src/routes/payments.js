// const { paymentLimiter } = require('../middlewares/rateLimiter');
// const router = require('express').Router();
// const auth = require('../middlewares/auth');
// const p = require('../controllers/payments.controller');

// // Routes protégées
// router.get('/my', auth, p.getMyPayments);

// // Routes paiement protégées
// router.post('/checkout', auth, paymentLimiter, p.createCheckout);
// router.post('/paypal/create', auth, paymentLimiter, p.createPaypalOrder);
// router.post('/paypal/capture', auth, paymentLimiter, p.capturePaypalOrder);

// module.exports = router;
const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');

// IMPORTANT : Correspond au frontend
router.post('/checkout', paymentsController.createCheckout);

// Pour le debug
router.get('/checkout', paymentsController.createCheckout);

router.get('/', paymentsController.getPayments);

module.exports = router;