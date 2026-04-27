const router = require('express').Router();
const auth = require('../middlewares/auth');
const p = require('../controllers/payments.controller');

router.post('/checkout', auth, p.createCheckout);
router.get('/my', auth, p.getMyPayments);
router.post('/webhook', p.webhook);

module.exports = router;