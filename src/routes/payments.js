const { paymentLimiter } = require('../middlewares/rateLimiter');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const p = require('../controllers/payments.controller');

// Webhook Stripe — pas d'auth (géré dans server.js)
router.post('/webhook', p.webhook);

// Routes protégées — utilisateur connecté obligatoire
router.get('/my', auth, p.getMyPayments);
router.post('/checkout', auth, paymentLimiter, p.createCheckout);
router.post('/paypal/create', auth, paymentLimiter, p.createPaypalOrder);
router.post('/paypal/capture', auth, paymentLimiter, p.capturePaypalOrder);

module.exports = router;
