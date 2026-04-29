const { paymentLimiter } = require('../middlewares/rateLimiter');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const p = require('../controllers/payments.controller');

router.post('/checkout', auth, p.createCheckout);
router.get('/my', auth, p.getMyPayments);
router.post('/webhook', p.webhook);

router.post('/checkout', paymentLimiter, auth, p.createCheckout);
router.post('/paypal/create', paymentLimiter, auth, p.createPaypalOrder);

module.exports = router;